// ==============================
// CycleCal — Camada de Persistência
// v1.9.7
// ==============================
// Centraliza todos os acessos ao localStorage.
// O index.html e demais módulos NÃO devem chamar
// localStorage diretamente — usar apenas estas funções.
//
// Chave principal: "cyclecal_user"
// Estrutura do objeto user:
// {
//   version: 2,
//   updated_at: "",
//   profile: { user_id, name, area, birthday, created_at },
//   settings: { base_date, scale_type, scale_pattern, dsr, offset },
//   scale_history: [],
//   vacations: [],
//   shift_swaps: [],
// }
// ==============================

const STORAGE_KEY = "cyclecal_user";

// ==============================
// loadUser()
// Lê e retorna o objeto user do localStorage.
// Retorna null se não existir ou se o JSON estiver corrompido.
// ==============================
export function loadUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

// ==============================
// saveUser(user)
// Persiste o objeto user no localStorage.
// Atualiza automaticamente o campo updated_at.
// ==============================
export function saveUser(user) {
    user.updated_at = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

// ==============================
// clearUser()
// Remove o objeto user do localStorage.
// Usado em reset/logout.
// ==============================
export function clearUser() {
    localStorage.removeItem(STORAGE_KEY);
}

// ==============================
// userExists()
// Retorna true se há um user salvo no localStorage.
// ==============================
export function userExists() {
    return localStorage.getItem(STORAGE_KEY) !== null;
}

// ==============================
// createDefaultUser()
// Retorna um objeto user novo com valores padrão.
// Não salva — chamar saveUser() em seguida se necessário.
// ==============================
export function createDefaultUser() {
    return {
        version: 2,
        updated_at: "",
        profile: {
            user_id: crypto.randomUUID(),
            name: "",
            area: "",
            birthday: "",
            created_at: new Date().toISOString(),
        },
        settings: {
            base_date: "",
            scale_type: "",
            scale_pattern: "",
            dsr: 0,
            offset: 0,
        },
        scale_history: [],
        vacations: [],
        shift_swaps: [],
    };
}

// ==============================
// migrateUser(user)
// Aplica migrações de schema in-place.
// Atualmente: garante version=2 e scale_history presente.
// Retorna o user migrado (mesma referência).
// ==============================
export function migrateUser(user) {
    if (!user.version || user.version < 2) {
        user.version = 2;
        user.scale_history = user.scale_history || [];

        if (user.settings?.scale_pattern && user.settings?.base_date) {
            user.scale_history.push({
                pattern:   user.settings.scale_pattern,
                type:      user.settings.scale_type || "",
                base_date: user.settings.base_date,
                since:     user.settings.base_date,
            });
        }
    }

    // Garante campos ausentes em versões antigas
    user.shift_swaps = user.shift_swaps || [];
    user.vacations   = user.vacations   || [];

    return user;
}

// ==============================
// initStorage()
// Inicializa o storage na primeira vez ou migra dados existentes.
// Substitui a função initUser() do index.html.
// Deve ser chamada uma vez no boot do app.
// ==============================
export function initStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        // Primeiro acesso — cria usuário padrão
        const user = createDefaultUser();
        saveUser(user);
        return user;
    }

    let user;
    try {
        user = JSON.parse(raw);
    } catch {
        // JSON corrompido — recria
        clearUser();
        const user = createDefaultUser();
        saveUser(user);
        return user;
    }

    // Migra e persiste se houve alteração de schema
    const migrated = migrateUser(user);
    saveUser(migrated);
    return migrated;
}
