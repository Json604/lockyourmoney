import { ReactNode } from "react";

export type ThemeType = {
  primary: string;
  background: string;
  text: string;
  subtext: string;
  card: string;
  outline: string;
  placeholderText: string;
  scrollCard: string;
};

export type ThemeProviderType = {
  children: ReactNode;
};
