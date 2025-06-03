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
  choice1:string
  choice2:string
  highAtnshn:string,
  lowAtnshn:string,
};

export type ThemeProviderType = {
  children: ReactNode;
};
