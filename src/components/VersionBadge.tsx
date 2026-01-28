import COMPONENT_VERSIONS, ComponentName } from "@/config/componentVersions";
interface VersionBadgeProps { component: ComponentName; show?: boolean; }
export const VersionBadge = ({ component, show = process.env.NODE_ENV === "development" }: VersionBadgeProps) => {
  if (!show) return null;
  return (
    <span className="absolute top-0 left-0 text-[9px] bg-gray-800 text-white px-1 rounded opacity-50 hover:opacity-100 z-50" title={`${component} v${COMPONENT_VERSIONS[component]}`}>
      v{COMPONENT_VERSIONS[component]}
    </span>
  );
};
