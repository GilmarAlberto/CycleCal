// ==============================
// CycleCal — Camada de Persistência
// v4.0
// ==============================
// Centraliza todos os acessos ao localStorage.
// O index.html e demais módulos NÃO devem chamar
// localStorage diretamente — usar apenas estas funções.
//
// Chave principal: "cyclecal_user"
// Estrutura do objeto user:
// {
//   version: 6,
//   updated_at: "",
//   profile: { user_id, name, area, birthday, created_at },
//   settings: {
//     base_date, scale_type, scale_pattern, dsr, offset, timezone, inst_color,
//     folga_extra_5plantoes,  // boolean — v4.0: folga extra a cada 5 plantões (12x36)
//     folga_dia_semana,       // number 0–6 | null — v4.1: dia fixo de folga (6h semanal)
//   },
//   scale_history: [],
//   vacations: [],
//   shift_swaps: [],
//   secondary_scale: null | {
//     institution: string,
//     color: string,
//     pattern: string,
//     base_date: string,
//   },
// }
// ==============================

const STORAGE_KEY = "cyclecal_user";

import { getLocalTimezone } from "./utils.js";

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
        version: 6,
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
            timezone: getLocalTimezone(),
            inst_color: "#3b82f6",
            folga_extra_5plantoes: false,  // v4.0: folga extra a cada 5 plantões (12x36)
            folga_dia_semana: null,        // v4.1: dia fixo de folga 0–6 (6h semanal)
        },
        scale_history: [],
        vacations: [],
        shift_swaps: [],
        secondary_scale: null,
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

    // v1.9.11 — migração v2 → v3: adiciona timezone se ausente
    if (user.version < 3) {
        user.version = 3;
        if (!user.settings.timezone) {
            user.settings.timezone = getLocalTimezone();
        }
    }

    // v1.9.12.b — migração v3 → v4: adiciona secondary_scale e inst_color
    if (user.version < 4) {
        user.version = 4;
        user.secondary_scale = user.secondary_scale ?? null;
        user.settings.inst_color = user.settings.inst_color ?? "#3b82f6";
    }

    // v2.0.0 — migração v4 → v5: renomeia scale_type "turno" → "escala"
    if (user.version < 5) {
        user.version = 5;
        if (user.settings?.scale_type === "turno") {
            user.settings.scale_type = "escala";
        }
        if (Array.isArray(user.scale_history)) {
            user.scale_history = user.scale_history.map((entry) =>
                entry.type === "turno" ? { ...entry, type: "escala" } : entry
            );
        }
    }

    // v4.0 — migração v5 → v6: adiciona campos folga_extra_5plantoes e folga_dia_semana
    if (user.version < 6) {
        user.version = 6;
        user.settings.folga_extra_5plantoes = user.settings.folga_extra_5plantoes ?? false;
        user.settings.folga_dia_semana      = user.settings.folga_dia_semana      ?? null;
    }

    // Garante campos ausentes em versões antigas
    user.shift_swaps = user.shift_swaps || [];
    user.vacations   = user.vacations   || [];

    return user;
}

// ==============================
// getTimezone()
// Retorna o timezone salvo no perfil do usuário.
// Fallback: detecta automaticamente via Intl.
// ==============================
export function getTimezone() {
    const user = loadUser();
    return user?.settings?.timezone || getLocalTimezone();
}

// ==============================
// saveTimezone(tz)
// Persiste o timezone no settings do usuário.
// ==============================
export function saveTimezone(tz) {
    const user = loadUser();
    if (!user) return;
    user.settings.timezone = tz;
    saveUser(user);
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

// ==============================
// IndexedDB — v1.9.9
// ==============================
// Stores: "vacations" e "shift_swaps"
// Chave DB: cyclecal_db, versão 1
//
// API pública:
//   loadVacations()           → Promise<Array>
//   saveVacations(arr)        → Promise<void>
//   loadShiftSwaps()          → Promise<Array>
//   saveShiftSwaps(arr)       → Promise<void>
//   migrateToIndexedDB()      → Promise<void>  (chamada no boot)
// ==============================

const IDB_NAME    = "cyclecal_db";
const IDB_VERSION = 2;

// ── Abre (ou cria) o banco ────────────────────────────────────────────────────
function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(IDB_NAME, IDB_VERSION);

        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("vacations")) {
                db.createObjectStore("vacations", { keyPath: "start" });
            }
            if (!db.objectStoreNames.contains("shift_swaps")) {
                db.createObjectStore("shift_swaps", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("extra_shifts")) {
                db.createObjectStore("extra_shifts", { keyPath: "id" });
            }
        };

        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror   = (e) => reject(e.target.error);
    });
}

// ── Helpers genéricos ─────────────────────────────────────────────────────────
function idbGetAll(storeName) {
    return openDB().then((db) => new Promise((resolve, reject) => {
        const tx  = db.transaction(storeName, "readonly");
        const req = tx.objectStore(storeName).getAll();
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror   = (e) => reject(e.target.error);
    }));
}

function idbPutAll(storeName, items) {
    return openDB().then((db) => new Promise((resolve, reject) => {
        const tx    = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        store.clear();
        for (const item of items) store.put(item);
        tx.oncomplete = () => resolve();
        tx.onerror    = (e) => reject(e.target.error);
    }));
}

// ── API pública ───────────────────────────────────────────────────────────────

export async function loadVacations() {
    try {
        return await idbGetAll("vacations");
    } catch {
        // Fallback: retorna do user no LocalStorage
        const user = loadUser();
        return user?.vacations || [];
    }
}

export async function saveVacations(arr) {
    await idbPutAll("vacations", arr);
}

export async function loadShiftSwaps() {
    try {
        return await idbGetAll("shift_swaps");
    } catch {
        const user = loadUser();
        return user?.shift_swaps || [];
    }
}

export async function saveShiftSwaps(arr) {
    await idbPutAll("shift_swaps", arr);
}

export async function loadExtraShifts() {
    try {
        return await idbGetAll("extra_shifts");
    } catch {
        return [];
    }
}

export async function saveExtraShifts(arr) {
    await idbPutAll("extra_shifts", arr);
}

// ── Migração única do LocalStorage → IndexedDB ────────────────────────────────
// Chamada no boot (initStorage). Só migra se o IDB estiver vazio.
export async function migrateToIndexedDB() {
    try {
        const user = loadUser();
        if (!user) return;

        const [existingVac, existingSwaps] = await Promise.all([
            idbGetAll("vacations"),
            idbGetAll("shift_swaps"),
        ]);

        // Migra vacations se IDB estiver vazio e LocalStorage tiver dados
        if (existingVac.length === 0 && user.vacations?.length > 0) {
            await idbPutAll("vacations", user.vacations);
        }

        // Migra shift_swaps se IDB estiver vazio e LocalStorage tiver dados
        if (existingSwaps.length === 0 && user.shift_swaps?.length > 0) {
            await idbPutAll("shift_swaps", user.shift_swaps);
        }
    } catch (err) {
        console.warn("[storage] migrateToIndexedDB falhou:", err);
    }
}
