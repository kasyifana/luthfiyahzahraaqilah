import { NextResponse } from 'next/server';
import {
  getProfile,
  getProjects,
  getActivities,
  updateProfile,
  addProject,
  updateProject,
  deleteProject,
  addActivity,
  updateActivity,
  deleteActivity
} from '@/lib/dataService';

export async function GET(): Promise<NextResponse> {
  try {
    const profile = await getProfile();
    const projects = await getProjects();
    const activities = await getActivities();

    return NextResponse.json({
      success: true,
      profile,
      projects,
      activities
    });
  } catch (error) {
    console.error("GET /api/admin failed:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (!action) {
      return NextResponse.json(
        { success: false, error: 'Action parameter is required.' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'update_profile': {
        const result = await updateProfile(payload);
        return NextResponse.json({ success: true, profile: result });
      }
      
      case 'add_project': {
        const result = await addProject(payload);
        return NextResponse.json({ success: true, project: result });
      }
      
      case 'update_project': {
        const { id, ...data } = payload;
        if (!id) {
          return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
        }
        const result = await updateProject(id, data);
        return NextResponse.json({ success: true, project: result });
      }
      
      case 'delete_project': {
        const { id } = payload;
        if (!id) {
          return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
        }
        const success = await deleteProject(id);
        return NextResponse.json({ success });
      }
      
      case 'add_activity': {
        const result = await addActivity(payload);
        return NextResponse.json({ success: true, activity: result });
      }
      
      case 'update_activity': {
        const { id, ...data } = payload;
        if (!id) {
          return NextResponse.json({ success: false, error: 'Activity ID is required' }, { status: 400 });
        }
        const result = await updateActivity(id, data);
        return NextResponse.json({ success: true, activity: result });
      }
      
      case 'delete_activity': {
        const { id } = payload;
        if (!id) {
          return NextResponse.json({ success: false, error: 'Activity ID is required' }, { status: 405 });
        }
        const success = await deleteActivity(id);
        return NextResponse.json({ success });
      }
      
      default:
        return NextResponse.json(
          { success: false, error: `Unsupported action parameter: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("POST /api/admin failed:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
