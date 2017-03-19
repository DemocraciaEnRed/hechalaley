import es from 'aor-language-spanish'

export default Object.assign({}, es, {
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
        name: 'Nombre',
        lastname: 'Apellido',
        bio: 'Bio',
        pictureURL: 'Avatar',
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
    }
  }
})
