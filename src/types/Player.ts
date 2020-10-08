export enum Role {
  TANK = "TANK",
  MELEE_DPS = "MELEE_DPS",
  RANGED_DPS = "RANGED_DPS",
  HEALER = "HEALER",
}

export interface CharacterSpecialization {
  className: string;
  id: string;
  specName: string;
  role: Role;
  variableName: string;
}

export interface Player {
  id: string;
  name: string;
  characterSpecializations: CharacterSpecialization[];
}
