import ud from 'urban-dictionary';

export async function lookup (definition) {
  try {
    const def = await ud.term(definition);
    return decode(def);
  } catch (err) {
    return { valid: false };
  }
}

export function decode (definitions) {
  if (definitions && Array.isArray(definitions.entries) && definitions.entries.length) {
    const entry = Object.assign({}, definitions.entries[0]);
    const parsed = entry.definition.replace(/[[\]]/g, '');
    const related = entry.definition.match(/[^[\]]+(?=])/g);

    return {
      valid: true,
      definition: parsed,
      related,
      original: definitions.entries[0]
    };
  } else {
    return { valid: false };
  }
}
