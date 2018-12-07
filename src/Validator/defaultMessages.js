'use strict';

const defaultMessages = {
    // English language - Used by default
    en: {
      numbers: '{fieldName} must be a valid number.',
      email: '{fieldName} must be a valid.',
      required: '{fieldName} is required.',
      date: '{fieldName} must be a valid date ({1}).',
      minlength: '{fieldName} length must be minimum {1}.',
      maxlength: '{fieldName} length must be lower than {1}.',
      alphanumeric: '{fieldName} must be a valid aplha numeric only.',
    },
    // French language
    fr: {
      numbers: 'Le champ "{0}" doit être un nombre valide.',
      email: 'Le champ "{0}" doit être une adresse email valide.',
      required: 'Le champ "{0}" est obligatoire.',
      date: 'Le champ "{0}" doit correspondre à une date valide ({1}).',
      minlength: 'Le nombre de caractère du champ "{0}" doit être supérieur à {1}.',
      maxlength: 'Le nombre de caractère du champ "{0}" doit être inférieur à {1}.'
    }
    // TODO Add other languages here...
};

export default defaultMessages;
