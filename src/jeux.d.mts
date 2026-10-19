export function racinePrive(): string;
export function cheminPrive(rel: string): string;
export function jeuPresent(rel: string): boolean;
export function raisonAbsent(rel: string): string;
export class JeuPriveAbsent extends Error { constructor(rel: string); }
