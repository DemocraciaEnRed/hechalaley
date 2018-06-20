import es from 'aor-language-spanish'

export default {
  ...es,
  hechalaley: {
    stageAttributes: 'Atributos',
    stageText: 'Contenido'
  },
  resources: {
    jurisdictions: {
      name: 'Provincia |||| Provincias',
      description: 'Son utilizadas como un atributo del Político.',
      fields: {
        name: 'Nombre'
      }
    },
    politicians: {
      name: 'Político |||| Políticos',
      fields: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        bio: 'Bio',
        pictureUrl: 'Avatar',
        appoinment: 'Cargo',
        party: 'Bloque',
        jurisdiction: 'Provincia'
      }
    },
    bills: {
      name: 'Ley |||| Leyes',
      fields: {
        published: 'Publicada?',
        title: 'Título',
        summary: 'Descripción',
        author: 'Firmante',
        coSigners: 'Co-firmantes'
      }
    },
    stages: {
      name: 'Etapa |||| Etapas',
      fields: {
        bill: 'Ley',
        published: 'Publicada?',
        title: 'Título',
        summary: 'Descripción',
        identification: 'Identificación Oficial',
        stageDate: 'Fecha',
        authors: 'Co-firmantes',
        text: 'Contenido'
      }
    },
    users: {
      name: 'Administrador |||| Administradores',
      fields: {
        email: 'Email'
      }
    }
  }
}
