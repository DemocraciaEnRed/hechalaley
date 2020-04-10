import { Edit, SimpleForm, TextInput, translate } from 'react-admin'

const ListTitle = translate(({ translate, resource, record }) => {
  const title = translate(`resources.${resource}.name`, { smart_count: 1 })
  return (
    <div>
      <span>{title}: {record ? `${record.name}` : ''}</span>
    </div>
  )
})

export default (props) => (
  <Edit title={<ListTitle resource='jurisdictions' />} undoable={false} actions={null} {...props}>
    <SimpleForm redirect='list'>
      <TextInput source='name' validation={{ required: true }} />
    </SimpleForm>
  </Edit>
)
