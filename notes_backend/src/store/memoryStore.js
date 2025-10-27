/**
 * Simple in-memory store for Notes.
 * This persists only for the life of the process.
 */
class MemoryStore {
  constructor() {
    this._notes = [];
  }

  getAll() {
    return this._notes;
  }

  getById(id) {
    return this._notes.find(n => n.id === id);
  }

  create(note) {
    this._notes.push(note);
    return note;
  }

  update(id, patch) {
    const idx = this._notes.findIndex(n => n.id === id);
    if (idx === -1) return null;
    const now = new Date().toISOString();
    const updated = {
      ...this._notes[idx],
      ...patch,
      updatedAt: now,
    };
    this._notes[idx] = updated;
    return updated;
  }

  delete(id) {
    const before = this._notes.length;
    this._notes = this._notes.filter(n => n.id !== id);
    return this._notes.length < before;
  }

  /**
   * Replace the store with provided items (without ids; ids assigned by caller if needed)
   */
  reset(seedItems = []) {
    const now = new Date().toISOString();
    this._notes = seedItems.map((item, i) => ({
      id: `seed-${i + 1}`,
      title: item.title ?? `Seed ${i + 1}`,
      content: item.content ?? '',
      createdAt: now,
      updatedAt: now,
    }));
  }
}

module.exports = new MemoryStore();
