import { CAREER_START_YEAR } from "@/lib/constants";

export const yearsOfExperience =
  new Date().getFullYear() - CAREER_START_YEAR - (new Date().getMonth() < 8 ? 1 : 0);