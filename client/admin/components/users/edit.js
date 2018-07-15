import { Edit, SimpleForm, TextInput } from 'react-admin'

export default (props) => (
  <Edit undoable={false} actions={null} {...props}>
    <SimpleForm redirect='list'>
      <TextInput source='email' validation={{ required: true }} />
    </SimpleForm>
  </Edit>
)
