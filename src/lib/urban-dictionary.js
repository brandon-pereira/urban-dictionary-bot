import ud from 'urban-dictionary';

export async function lookup (definition) {
  try {
    const def = await ud.term(definition);
    if (def && Array.isArray(def.entries) && def.entries.length) {
      return decode(def.entries[0]);
    }
    return { valid: false };
  } catch (err) {
    console.log(err);
    return { error: true };
  }
}

export async function random () {
  try {
    const random = await ud.random();
    const definition = decode(random);
    definition.random = true;
    return definition;
  } catch (err) {
    return { error: true };
  }
}

export function decode (entry) {
  const _entry = Object.assign({}, entry);
  const parsed = _entry.definition.replace(/[[\]]/g, '');
  const related = _entry.definition.match(/[^[\]]+(?=])/g);
  return {
    error: false,
    valid: true,
    word: _entry.word,
    definition: parsed,
    related: related || [],
    original: entry
  };
}
