export type Profile = {
  id: string;
  name: string;
  type: ProfileType;
  order: number;
};

export enum ProfileType {
  DEFAULT = "default",
  CUSTOM = "custom",
}