import { Edit, SimpleForm, TextInput, translate } from 'react-admin'

const ListTitle = translate(({ translate, resource, record }) => {
  const title = translate(`resources.${resource}.name`, { smart_count: 1 })
  return (
    <div>
      <span>{title}: {record ? `${record.email}` : ''}</span>
    </div>
  )
})

export default (props) => (
  <Edit title={<ListTitle resource='users' />} undoable={false} actions={null} {...props}>
    <SimpleForm redirect='list'>
      <TextInput source='email' validation={{ required: true }} />
    </SimpleForm>
  </Edit>
)
