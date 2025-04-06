import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { generateHealthSummary } from '@/lib/ai';

/**
 * API route for generating health summaries
 * POST /api/health-summary
 */
export async function POST(request: NextRequest) {
  try {
    // Get supabase client
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { petId, includeGeneticData = true, includeHealthHistory = true } = body;

    if (!petId) {
      return NextResponse.json(
        { error: 'Missing required field: petId' },
        { status: 400 }
      );
    }

    // Get pet data from database
    const { data: pet, error: petError } = await supabase
      .from('pets')
      .select('*')
      .eq('id', petId)
      .single();

    if (petError || !pet) {
      return NextResponse.json(
        { error: 'Pet not found' },
        { status: 404 }
      );
    }

    // Check if user has access to this pet
    if (pet.user_id !== session.user.id) {
      const { data: orgAccess } = await supabase
        .from('organization_users')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('org_id', pet.org_id)
        .single();

      if (!orgAccess) {
        return NextResponse.json(
          { error: 'Unauthorized access to this pet' },
          { status: 403 }
        );
      }
    }

    // Get genetic data if needed
    let geneticData = null;
    if (includeGeneticData && pet.genetic_data_url) {
      // In a real application, this would fetch and parse the genetic data
      // For this example, we'll use mock data
      geneticData = {
        breed_markers: {
          golden_retriever: 0.92,
          labrador: 0.05,
          other: 0.03
        },
        genetic_risks: [
          {
            condition: "Hip Dysplasia",
            risk_factor: "Moderate",
            genes_involved: ["COL2A1", "GDF5"]
          },
          {
            condition: "Progressive Retinal Atrophy",
            risk_factor: "Low",
            genes_involved: ["PRCD"]
          }
        ],
        coat_color_genes: {
          B_locus: "BB",
          E_locus: "Ee",
          K_locus: "kyky"
        }
      };
    }

    // Get health history if needed
    let healthHistory = null;
    if (includeHealthHistory) {
      // In a real application, this would query a health records table
      // For this example, we'll use mock data
      healthHistory = {
        vaccinations: [
          {
            type: "Rabies",
            date: "2023-03-15",
            due_date: "2024-03-15"
          },
          {
            type: "DHPP",
            date: "2023-01-20",
            due_date: "2024-01-20"
          }
        ],
        checkups: [
          {
            date: "2023-06-10",
            weight_kg: 28.5,
            notes: "Healthy weight, good energy, minor ear infection treated"
          },
          {
            date: "2022-12-05",
            weight_kg: 27.8,
            notes: "Annual checkup, all vitals normal"
          }
        ],
        conditions: [
          {
            name: "Seasonal Allergies",
            diagnosed: "2022-05-18",
            status: "Managed with medication"
          }
        ],
        bloodwork: {
          last_date: "2023-06-10",
          results: {
            wbc: "Normal",
            rbc: "Normal",
            alt: "Slightly elevated",
            ast: "Normal"
          }
        }
      };
    }

    // Generate health summary
    const summary = await generateHealthSummary(geneticData, healthHistory);

    // Store summary in database
    const { error: updateError } = await supabase
      .from('pets')
      .update({
        health_data: {
          ...pet.health_data,
          ai_summary: {
            ...summary,
            generated_at: new Date().toISOString()
          }
        }
      })
      .eq('id', petId);

    if (updateError) {
      console.error('Error storing health summary:', updateError);
    }

    // Return the summary
    return NextResponse.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Error in health summary API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate health summary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 