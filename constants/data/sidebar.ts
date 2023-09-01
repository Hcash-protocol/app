import { IconType } from "react-icons";
import { BsCoin } from "react-icons/bs";

export interface SideBarDataProps {
  name: string;
  icon: IconType;
  link: string;
  disabled?: boolean;
}

export const SideBarData: Array<SideBarDataProps> = [
  { name: "Hcash", icon: BsCoin, link: "/hcash" },
];
