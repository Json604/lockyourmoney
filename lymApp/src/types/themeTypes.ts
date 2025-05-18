import { ReactNode } from "react";

export type ThemeType = {
  primary: string;
  background: string;
  text: string;
  subtext: string;
  card: string;
  outline: string;
  placeholderText: string;
};

export type ThemeProviderType = {
  children: ReactNode;
};
