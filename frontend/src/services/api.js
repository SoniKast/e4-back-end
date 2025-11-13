export const apiService = {
    // Auth methods
    async login(credentials) {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erreur lors de la connexion');
        }

        const data = await response.json();
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            // Stocker également dans les cookies pour le middleware Next.js
            document.cookie = `token=${data.access_token}; path=/; max-age=86400`; // 24 heures
            document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=86400`;
        }
        return data;
    },

    async register(userData) {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erreur lors de l\'inscription');
        }

        const data = await response.json();
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            // Stocker également dans les cookies pour le middleware Next.js
            document.cookie = `token=${data.access_token}; path=/; max-age=86400`; // 24 heures
            document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=86400`;
        }
        return data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Supprimer également les cookies
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    // Helper method for authenticated requests
    async authFetch(url, options = {}) {
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            this.logout();
            window.location.href = '/login';
            throw new Error('Session expirée, veuillez vous reconnecter');
        }

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return response.json();
    },

    // Interventions
    async getInterventions() {
        return this.authFetch("http://localhost:5000/api/interventions");
    },

    async createIntervention(interventionData) {
        return this.authFetch("http://localhost:5000/api/interventions", {
            method: 'POST',
            body: JSON.stringify(interventionData),
        });
    },

    // Projets
    async getProjets() {
        return this.authFetch("http://localhost:5000/api/projets");
    },

    // Salariés
    async getSalaries() {
        return this.authFetch("http://localhost:5000/api/salaries");
    },

    async createSalarie(salarieData) {
        return this.authFetch("http://localhost:5000/api/salaries", {
            method: 'POST',
            body: JSON.stringify(salarieData),
        });
    },

    // Projets (duplicate removed)

    async createProjet(projetData) {
        return this.authFetch("http://localhost:5000/api/projets", {
            method: 'POST',
            body: JSON.stringify(projetData),
        });
    },

    // Employee schedule
    async getEmployeeSchedule(salarieId) {
        return this.authFetch(`http://localhost:5000/api/interventions/salarie/${salarieId}`);
    },

    // Project time summary
    async getProjectTimeSummary(projetId) {
        return this.authFetch(`http://localhost:5000/api/projets/${projetId}/time-summary`);
    },
    // Clients
    async getClients() {
        return this.authFetch("http://localhost:5000/api/client");
    },

    async createClient(clientData) {
        return this.authFetch("http://localhost:5000/api/client", {
            method: 'POST',
            body: JSON.stringify(clientData),
        });
    },

    // Materiels
    async getMateriels() {
        return this.authFetch("http://localhost:5000/api/materiels");
    },

    async createMateriel(materielData) {
        return this.authFetch("http://localhost:5000/api/materiels", {
            method: 'POST',
            body: JSON.stringify(materielData),
        });
    },

    async getMaterielsByIntervention(interventionId) {
        return this.authFetch(`http://localhost:5000/api/materiels/intervention/${interventionId}`);
    },
};