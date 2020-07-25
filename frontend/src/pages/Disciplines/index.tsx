import React, { useState } from 'react';
import './styles.css';
import MaterialTable, { Column } from 'material-table'

import Content from '../../components/Content';

interface Row {
  student_name: string;
  student_email: string;
  disciplina_1?: string;
  disciplina_2?: string;
  group?: string;
  disciplina_1_comment?: string;
  disciplina_2_comment?: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const Disciplines = () => {
  const styles = {
    width: "min(1200px, 85%)",
    height: "max(30vh, 550px)",
    border: '1px solid transparent',
    borderRadius: '5px',
    padding: '1em'
  }

  const [state, setState] = useState<TableState>({
    columns: [
      {
        title: 'Nome aluno', field: 'student_name', editable: 'never'
      },
      {
        title: 'Email', field: 'student_email', editable: 'never'
      },
      {
        title: 'Grupo', field: 'group', editable: 'never'
      },
      {
        title: 'Disciplina 1 (Nota)', field: 'disciplina_1',
      },
      {
        title: 'Disciplina 2 (Nota)', field: 'disciplina_2',
      },
      {
        title: 'Disciplina 1 (Comentário)', field: 'disciplina_1_comment', groupTitle: 'disciplina_4',
      },
      {
        title: 'Disciplina 2 (Comentário)', field: 'disciplina_2_comment', groupTitle: 'disciplina_3'
      },
    ],
    data: [
      {
        student_name: 'Jane Doe',
        student_email: 'janedoe@email.com',
        group: '1',
        disciplina_1: '10',
        disciplina_2: '7',
        disciplina_1_comment: 'Lorem ipsum consectur',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '1',
        disciplina_1: '10',
        disciplina_2: '7',
        disciplina_1_comment: 'Lorem ipsum consectur',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'Jane Doe',
        student_email: 'janedoe@email.com',
        group: '2',
        disciplina_1: '3',
        disciplina_2: '9',
        disciplina_1_comment: 'Lorem ipsum dolor sit amet',
        disciplina_2_comment: 'Lorem ipsum consectur'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '2',
        disciplina_1: '5',
        disciplina_2: '9',
        disciplina_1_comment: 'Fez melhor que jane doe',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '2',
        disciplina_1: '5',
        disciplina_2: '9',
        disciplina_1_comment: 'Fez melhor que jane doe',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '2',
        disciplina_1: '5',
        disciplina_2: '9',
        disciplina_1_comment: 'Fez melhor que jane doe',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '2',
        disciplina_1: '5',
        disciplina_2: '9',
        disciplina_1_comment: 'Fez melhor que jane doe',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
    ],
  });


  return (
    <Content>
      <MaterialTable
        options={{
          toolbar: false,
        }}
        columns={state.columns}
        data={state.data}
        style={styles}
        onChangeRowsPerPage={() => {}}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    console.log(data);
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
        }}
      />
    </Content>
  );
}

export default Disciplines;