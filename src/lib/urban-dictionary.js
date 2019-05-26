import ud from 'urban-dictionary';
const MAX_DEFINITION_LENGTH = 2000;

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
  const data = {
    error: false,
    valid: true
  };
  const _entry = Object.assign({}, entry);
  const related = _entry.definition.match(/[^[\]]+(?=])/g) || [];
  let parsed = _entry.definition.replace(/[[\]]/g, '');
  const word = _entry.word;
  if (parsed.length >= MAX_DEFINITION_LENGTH) {
    data.truncated = true;
    parsed = parsed.substring(0, MAX_DEFINITION_LENGTH - 3) + '...';
  }
  return {
    ...data,
    word,
    definition: parsed,
    related: [...new Set(related)],
    original: entry
  };
}
