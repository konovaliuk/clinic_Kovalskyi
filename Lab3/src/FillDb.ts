import { mysqlconnectionsPool } from "./mysql.js";

const diseases = `Diabetes
Cancer
Heart disease
Alzheimer's disease
Arthritis
Asthma
Chronic obstructive pulmonary disease (COPD)
Depression
High blood pressure
Malaria
Measles
Influenza (flu)
Tuberculosis (TB)
Hepatitis B
Cholera
Dengue fever
Ebola virus disease
HIV/AIDS
Lyme disease
Parkinson's disease`;
let rows = diseases.split("\n");
rows.forEach((arr) => {
  mysqlconnectionsPool.getConnection(function (err, connection) {
    connection.execute("INSERT INTO disease(name) VALUES (?)", [arr], function (err, results) {
      if (err) console.log(err);
      connection.release();
    });
  });
});
