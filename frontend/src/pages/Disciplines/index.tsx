import React, { useState, useEffect } from 'react';
import './styles.css';
import MaterialTable, { Column } from 'material-table';

import Content from '../../components/Content';
import api from '../../api';

interface DisciplinesRow {
  Ambiente_de_Ensino_e_Aprendizagem_a_Distância?: string,
  AmbientedeEnsinoeAprendizagemaDistância?: string,
  AnáliseeModelagemdeBancodeDados?: string,
  Análise_e_Modelagem_de_Banco_de_Dados?: string,
}


interface Row extends DisciplinesRow {
  nome?: string,
  email?: string,
  student_name: string,
  student_email: string,
  disciplina_2?: string,
  group?: string,
  disciplina_1_comment?: string,
  disciplina_2_comment?: string,
}

interface TableState {
  columns: Array<Column<Row>>,
  data: Row[]
}

interface Discipline {
  carga_horaria?: number,
  contem_modulo_id?: number,
  id: number,
  nome?: string,
  peso?: number,
  ministra?: []
};

interface Entrega {
  grupos: number
}

interface Student extends Person {
  pessoa_aluno_id?: number,
  entrega: [Entrega],
  avalia_disciplina_id?: number,
  grupo?: number
}

interface Person {
  nome?: string,
  id?: number,
  email?: string,
  aluno?: [Student]
}


interface Avalia {
  avalia_disciplina_id: number,
  avalia_pessoa_id?: number,
  avalia_projeto_integrador_id?: number,
  comentario?: string,
  nota_parcial?: string,
  pessoa: Student
}

interface AvaliaContainer {
  avalia: [Avalia],
  avalia_disciplina_id: number,
  aluno: [Student],
  nome: string
}


interface DisciplineContainer {
  disciplina?: Discipline
}

interface MinistraTutor {
  ministra?: [DisciplineContainer],
  disciplina?: Discipline,
  pessoa_tutor_id: number,
  tipo: string | null
}

interface MinistraProfessor {
  pessoa_professor_id: number,
  ministra?: [DisciplineContainer],
  disciplina?: Discipline
}


const Disciplines = () => {
  const styles = {
    width: "min(1200px, 85%)",
    height: "clamp(15vh, 650px, 40rem)",
    border: '1px solid transparent',
    borderRadius: '5px',
    padding: '1em',
  }

  const [tableState, setTableState] = useState<TableState>({
    columns: [
      {
        title: 'Disciplina 1 (Nota)', field: 'disciplina_1',
      },
      {
        title: 'Disciplina 2 (Nota)', field: 'disciplina_2',
      },
      {
        title: 'Disciplina 1 (Comentário)', field: 'disciplina_1_comment',
      },
      {
        title: 'Disciplina 2 (Comentário)', field: 'disciplina_2_comment',
      },
    ],
    data: [
      {
        student_name: 'Jane Doe',
        student_email: 'janedoe@email.com',
        group: '1',
        disciplina_2: '7',
        disciplina_1_comment: 'Lorem ipsum consectur',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '1',
        disciplina_2: '7',
        disciplina_1_comment: 'Lorem ipsum consectur',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'Jane Doe',
        student_email: 'janedoe@email.com',
        group: '2',
        disciplina_2: '9',
        disciplina_1_comment: 'Lorem ipsum dolor sit amet',
        disciplina_2_comment: 'Lorem ipsum consectur'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '2',
        disciplina_2: '9',
        disciplina_1_comment: 'Fez melhor que jane doe',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '2',
        disciplina_2: '9',
        disciplina_1_comment: 'Fez melhor que jane doe',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '2',
        disciplina_2: '9',
        disciplina_1_comment: 'Fez melhor que jane doe',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
      {
        student_name: 'John Doe',
        student_email: 'johndoe@email.com',
        group: '2',
        disciplina_2: '9',
        disciplina_1_comment: 'Fez melhor que jane doe',
        disciplina_2_comment: 'Lorem ipsum dolor sit amet'
      },
    ],
  });

  const [professorDisciplines, setProfessorDisciplines] = useState<MinistraProfessor>();
  const [tutorDisciplines, setTutorDisciplines] = useState<MinistraTutor>();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/disciplines/professor/').then(async res => {
      const professorDisciplines: MinistraProfessor = await res.data;
      setProfessorDisciplines(professorDisciplines);

      const tutorDisciplines: MinistraTutor = await (await api.get('/disciplines/tutor')).data;
      setTutorDisciplines(tutorDisciplines);

      // let serializeProfessor: MinistraProfessor = { pessoa_professor_id: -1 };
      // let serializeTutor: MinistraTutor = { pessoa_tutor_id: -1, tipo: '' };

      // try {
      //   serializeProfessor = {
      //     ...professorDisciplines,
      //     disciplina: professorDisciplines.ministra?.[0].disciplina
      //   }
      //   serializeTutor = {
      //     ...tutorDisciplines,
      //     disciplina: tutorDisciplines.ministra?.[0].disciplina
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
      const serializedDisciplines: Discipline[] = [];

      // try {
      //   professorDisciplines.ministra?.map((disciplina) => {
      //     serializedDisciplines.push(disciplina.disciplina!);
      //   });

      //   delete serializeProfessor.ministra;
      //   setProfessorDisciplines(serializeProfessor);
      // } catch (err) {
      //   console.log(err);
      // }

      // try {
      //   tutorDisciplines.ministra?.map((disciplina) => {
      //     serializedDisciplines.push(disciplina.disciplina!);
      //   });

      //   delete serializeTutor.ministra;
      //   setTutorDisciplines(serializeTutor);
      // } catch (err) {
      //   console.log(err);
      // }


      const getStudents = async () => {
        return await Promise.all(
          serializedDisciplines.map(async (discipline: Discipline) => {
            try {
              const students = await (await api.get(`/disciplines/${discipline.id}/students`)).data;
              return { avalia_disciplina_id: discipline.id, ...students };
            } catch (err) {
              console.log(err);
            }
          }))
      }

      const students = await getStudents();
      const serializedStudents: Student[] = [];

      students.map((avalia: AvaliaContainer) => {

        const _avalia = avalia.avalia;
        const id = avalia.avalia_disciplina_id;
        const avalia_disciplina_nome = avalia.nome;

        _avalia.map((newAvalia: Avalia) => {

          const pessoa = newAvalia.pessoa;
          const nota_parcial = newAvalia.nota_parcial;
          const grupos = pessoa.aluno?.[0].entrega[0].grupos;

          let aluno = { grupo: grupos, avalia_disciplina_id: id, ...pessoa, nota_parcial, avalia_disciplina_nome };

          delete aluno.aluno;
          serializedStudents.push(aluno);

          return null;
        });
        return null;
      });

      // console.log(serializedStudents);

      // const filteredStudents = serializedStudents.filter((student, index, self) => {
      //   return index === self.findIndex((obj) => (obj.id === student.id));
      // });
      setStudents(serializedStudents);

      const table: TableState = {
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
        ],
        data: [
          {
            student_name: 'Jane Doe',
            student_email: 'janedoe@email.com',
            group: '1',
            Ambiente_de_Ensino_e_Aprendizagem_a_Distância: '10',
            AmbientedeEnsinoeAprendizagemaDistância: 'Um comentário',
            Análise_e_Modelagem_de_Banco_de_Dados: '8',
            AnáliseeModelagemdeBancodeDados: 'Lorem ipsum dolor sit amet'
          },
          {
            student_name: 'John Doe',
            student_email: 'johndoe@email.com',
            group: '1',
            disciplina_2: '10',
            disciplina_1_comment: 'Lorem ipsum consectur',
            disciplina_2_comment: 'Lorem ipsum dolor sit amet'
          },
          {
            student_name: 'Jane Doe',
            student_email: 'janedoe@email.com',
            group: '2',
            disciplina_2: '9',
            disciplina_1_comment: 'Lorem ipsum dolor sit amet',
            disciplina_2_comment: 'Lorem ipsum consectur'
          },
          {
            student_name: 'John Doe',
            student_email: 'johndoe@email.com',
            group: '2',
            disciplina_2: '9',
            disciplina_1_comment: 'Fez melhor que jane doe',
            disciplina_2_comment: 'Lorem ipsum dolor sit amet'
          },
          {
            student_name: 'John Doe',
            student_email: 'johndoe@email.com',
            group: '2',
            disciplina_2: '9',
            disciplina_1_comment: 'Fez melhor que jane doe',
            disciplina_2_comment: 'Lorem ipsum dolor sit amet'
          },
          {
            student_name: 'John Doe',
            student_email: 'johndoe@email.com',
            group: '2',
            disciplina_2: '9',
            disciplina_1_comment: 'Fez melhor que jane doe',
            disciplina_2_comment: 'Lorem ipsum dolor sit amet'
          },
          {
            student_name: 'John Doe',
            student_email: 'johndoe@email.com',
            group: '2',
            disciplina_2: '9',
            disciplina_1_comment: 'Fez melhor que jane doe',
            disciplina_2_comment: 'Lorem ipsum dolor sit amet'
          },
        ],
      };

      try {
        if (professorDisciplines?.ministra) {
          professorDisciplines?.ministra.map((arr) => {
            const professorGrade: Column<Row> = {};
            const nome = arr.disciplina?.nome;
            // const id = arr.disciplina?.id;
            
            professorGrade.title = nome + "(Nota)";
            professorGrade.field = nome?.replace(/\s/g, '_');
            
            table.columns.push(professorGrade);
            
            
            const professorComment: Column<Row> = {};
            professorComment.title = nome + "(Comentário)";
            professorComment.field = nome?.replace(/\s/g,'');

            table.columns.push(professorComment);
          });
        }

        if (tutorDisciplines?.ministra) {
          tutorDisciplines?.ministra.map((arr) => {
            const tutorGrade: Column<Row> = {};
            const nome = arr.disciplina?.nome;
            // const id = arr.disciplina?.id;

            tutorGrade.title = nome + "(Nota)";
            tutorGrade.field = nome?.replace(/\s/g, '_');
            tutorGrade.editable = 'never';

            table.columns.push(tutorGrade);

            const tutorComment: Column<Row> = {};

            tutorComment.title = nome + "(Comentário)";
            tutorComment.field = nome?.replace(/\s/g, '');
            tutorComment.editable = 'never';

            table.columns.push(tutorComment);
          });
        }
      } catch (err) {
        console.log(err);
      };
      setTableState(table);
      setLoading(false);
    })}, []);

    if(loading) {
      return <div>loading...</div>
    }
    return (
      <Content>
        <MaterialTable
          options={{
            toolbar: false,
          }}
          columns={tableState.columns}
          data={tableState.data}
          style={styles}
          onChangeRowsPerPage={() => { }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setTableState((prevState) => {
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