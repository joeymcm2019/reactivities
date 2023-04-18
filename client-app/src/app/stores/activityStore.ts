import { makeAutoObservable, runInAction} from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';


export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) =>
      Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      activities.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(true);
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  setLoading = (state: boolean) => {
    this.loading = state;
  }

  selectActivity = (id: string) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.selectedActivity = this.activityRegistry.get(id);
  }

  cancelSelect = () => {
    this.selectedActivity = undefined;
  }

  openForm = (id?: string) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    id ? this.selectActivity(id) : this.cancelSelect();
    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      this.setLoading(false);
      }
    }

  editActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectActivity(activity.id);
        this.openForm(activity.id);
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
    
    
  }

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        if (this.selectedActivity?.id === id) {
          this.cancelSelect();
        }
        this.loading = false;
      })
      
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  }


}

