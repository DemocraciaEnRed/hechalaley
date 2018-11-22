import es from 'ra-language-spanish'

export default {
  ra: {
    ...es.ra,
    notification: {
      ...es.ra.notification,
      deleted: 'Borrando elemento... |||| Borrando %{smart_count} elementos...'
    }
  },
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
        published: 'Pública',
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
        published: 'Pública',
        title: 'Título',
        summary: 'Descripción',
        identification: 'Número Expediente',
        currentCondition: 'Estado Actual',
        nextCondition: 'Próximos Pasos',
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
