import { Injectable } from '@nestjs/common';

export interface Salarie {
  id: number;
  nom: string;
  prenom: string;
}

@Injectable()
export class SalarieService {
  private salaries: Salarie[] = [
    { id: 1, nom: 'Dupont', prenom: 'Jean' },
    { id: 2, nom: 'Martin', prenom: 'Marie' },
    { id: 3, nom: 'Bernard', prenom: 'Pierre' },
  ];

  async findOne(id: number): Promise<Salarie | null> {
    const salarie = this.salaries.find(s => s.id === id);
    return salarie || null;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ salaries: Salarie[], total: number }> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSalaries = this.salaries.slice(startIndex, endIndex);
    
    return {
      salaries: paginatedSalaries,
      total: this.salaries.length,
    };
  }

  async create(data: { nom: string; prenom: string }): Promise<Salarie> {
    const newId = Math.max(...this.salaries.map(s => s.id)) + 1;
    const newSalarie: Salarie = {
      id: newId,
      nom: data.nom,
      prenom: data.prenom,
    };
    
    this.salaries.push(newSalarie);
    return newSalarie;
  }

  async update(id: number, data: { nom?: string; prenom?: string }): Promise<Salarie | null> {
    const salarieIndex = this.salaries.findIndex(s => s.id === id);
    if (salarieIndex === -1) {
      return null;
    }

    this.salaries[salarieIndex] = {
      ...this.salaries[salarieIndex],
      ...data,
    };

    return this.salaries[salarieIndex];
  }

  async remove(id: number): Promise<boolean> {
    const salarieIndex = this.salaries.findIndex(s => s.id === id);
    if (salarieIndex === -1) {
      return false;
    }

    this.salaries.splice(salarieIndex, 1);
    return true;
  }
}