import { Edit, SimpleForm, TextInput } from 'admin-on-rest/lib/mui'

export default (props) => (
  <Edit actions={null} {...props}>
    <SimpleForm>
      <TextInput source='name' validation={{ required: true }} />
    </SimpleForm>
  </Edit>
)
