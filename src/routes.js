
import Dashboard from "views/Dashboard/Dashboard.jsx";
import WorkOrder from "views/WorkOrder/work-order";
import Ambiance from "views/Ambiance/ambiance";
import Activities from "views/Activities/activities";
import Dining from "views/Dining/dining";
import Tv from "views/Tv/Tv";
import Netflix from "views/Netflix/Netflix";
import Weather from "views/Weather/Weather";
import Settings from "views/Settings/Settings";
import Repairs from "views/Repairs/Repairs";
import CalendarActivities from "views/CalendarActivities/calendar-activities";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt",
    component: Dashboard,
    layout: "/view"
  },
  {
    path: "/activities",
    name: "Activities",
    icon: "fas fa-puzzle-piece",
    component: Activities,
    layout: "/view"
  },
  {
    path: "/dining",
    name: "Dining",
    icon: "fas fa-utensils",
    component: Dining,
    layout: "/view"
  },
  {
    path: "/ambiance",
    name: "Ambiance",
    icon: "fas fa-music",
    component: Ambiance,
    layout: "/view"
  },
  {
    path: "/repairs",
    name: "Repairs",
    icon: "fas fa-tools",
    component: Repairs,
    layout: "/view"
  },
  {
    path: "/calendar-activities",
    name: "Calendar",
    icon: "far fa-calendar-alt",
    component: CalendarActivities,
    layout: "/view"
  },
    {
    path: "/weather",
    name: "Weather",
    icon: "fas fa-cloud-sun",
    component: Weather,
    layout: "/view"
  }
];

export default dashboardRoutes;
