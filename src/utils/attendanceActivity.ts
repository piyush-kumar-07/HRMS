export type AttendanceActivity = {
    id: string;
    employeeName: string;
    employeeId: string;
    action: string;
    by: string;
    timestamp: string;
};

const activities: AttendanceActivity[] = [];
const listeners = new Set<(items: AttendanceActivity[]) => void>();

export const getAttendanceActivities = () => [...activities];

export const addAttendanceActivity = (activity: AttendanceActivity) => {
    activities.unshift(activity);
    activities.splice(10);
    const snapshot = [...activities];
    listeners.forEach(listener => listener(snapshot));
};

export const subscribeToAttendanceActivities = (
    listener: (items: AttendanceActivity[]) => void,
) => {
    listeners.add(listener);
    listener([...activities]);
    return () => listeners.delete(listener);
};
