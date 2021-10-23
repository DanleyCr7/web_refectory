import React, { useState, useEffect } from 'react';

import CoursesTable from '../../components/coursesTable';
import CountMeal from '../../components/countMeal';
import api from '../../services/api';

const Main = _ => {
  const [courses, setCourses] = useState([]);

  const apiData = async _ => {
    try {
      const resp = await api.get('/courses');
      setCourses(resp.data);
      console.log(resp.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(_ => {
    apiData();
  }, []);

  return (
    <>
      <main style={{ flexGrow: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          minHeight: '64px',
        }}
        />

        <CoursesTable
          courses={courses}
          apiData={apiData}
          title='Cursos'
        />

      </main>
      <CountMeal />
    </>
  );
};

export default Main;