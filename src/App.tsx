import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Select, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { 
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentsByGender,
    getStudentsByCity,
    getStudentsByString
} from './services/students.service'; 
import { 
    getProfessors,
    getProfessorById,
    getProfessorByString,
    createProfessor,
    updateProfessor,
    deleteProfessor,
    getTop3RecurringStudentsPerProfessor,
    getProfessorsInMultipleSessions,
    professorTeachesInCity
} from './services/professors.service'; 
import { 
    getStudentGroups,
    getStudentGroupById,
    createStudentGroup,
    updateStudentGroup,
    deleteStudentGroup,
    assignGroupToCourseSession,
    getStudentsInMultipleGroups,
    createTPGroups
} from './services/studentGroups.service'; 
import { 
    getCourseSessions,
    getCourseSessionById,
    createCourseSession,
    updateCourseSession,
    deleteCourseSession,
    assignProfessorToCourseSession,
    getCourseSessionsByCity,
    getCourseSessionsSortedByDate,
    getCourseSessionsByDate,
    countStudentsWithMoreThanXCourses,
    getCourseSessionWithMostStudents

} from './services/courseSessions.service';
import { DataTable } from './components/DataTable';
import { AnimatePresence, motion } from 'framer-motion';

// PAS FINI
function App() {
    const [action, setAction] = useState<string>('students');
    const [filterText, setFilterText] = useState<string>('');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [logs, setLogs] = useState<string[]>([]);

    const title = "Gestion d'école";

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const rowVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
    
    useEffect(() => {
        console.log("GetStudents avant ajout dedans: ", getStudents());
        console.log("Etudiant avec ID 1: ", getStudentById(1));
        console.log("Ajout étudiant John Doe: ", createStudent({id: 0, firstName: 'John', lastName: 'Doe', gender: 'M'}));
        console.log("GetStudents après ajout dedans: ",getStudents());
        console.log("Update étudiant Alice De Vivante après opération sexuelle: ", updateStudent(1, {id: 1, firstName: 'Bob', lastName: 'De Vivant', gender: 'M'}));
        console.log("GetStudents après update étudiant dedans: ",getStudents());
        console.log("Suppression de l'étudiant Bob De Vivant: ", deleteStudent(1));
        console.log("GetStudents après suppression dedans: ",getStudents());
        console.log("Etudiants masculins: ", getStudentsByGender('M'));
        console.log("Etudiants féminins: ", getStudentsByGender('F'));
        console.log("Etudiants à Paris: ", getStudentsByCity('Paris'));
        console.log("Etudiants dont le nom contient 'Jonathan': ", getStudentsByString('Jonathan'));
        console.log("Professeurs: ", getProfessors());
        console.log("Professeur avec ID 1: ", getProfessorById(1));
        console.log("Recherche professeur avec 'Emily' dedans: ", getProfessorByString('Emily'));
        console.log("Ajout professeur Johnny Joestar: ", createProfessor({id: 0, firstName: 'Johnny', lastName: 'Joestar', courseSessions: [3]}));
        console.log("Professeurs après ajout dedans: ",getProfessors());
        console.log("Changement session prof Emily Davis : ", updateProfessor(1, {id: 1, firstName: 'Emily', lastName: 'Davis', courseSessions: [1, 2]}));
        console.log("Professeurs après update professeur dedans: ",getProfessors());
        console.log("Suppression du professeur Emily Davis: ", deleteProfessor(1));
        console.log("Professeurs après suppression dedans: ",getProfessors());
        console.log("Groupes d'étudiants: ", getStudentGroups());
        console.log("Groupe d'étudiant avec ID 1: ", getStudentGroupById(1));
        console.log("Ajout groupe d'étudiant Groupe 1: ", createStudentGroup({id: 0, name: 'Groupe 1', students: [1, 2]}));
        console.log("Groupes d'étudiants après ajout dedans: ",getStudentGroups());
        console.log("Changement session groupe 1: ", updateStudentGroup(1, {id: 1, name: 'Groupe 2', students: [1, 3]}));
        console.log("Groupes d'étudiants après update groupe dedans: ",getStudentGroups());
        console.log("Suppression du groupe d'étudiant Groupe 2: ", deleteStudentGroup(1));
        console.log("Groupes d'étudiants après suppression dedans: ",getStudentGroups());
        console.log("Assignation du groupe 1 à la session 1: ", assignGroupToCourseSession(1, 1));
        console.log("Etudiants dans plusieurs groupes: ", getStudentsInMultipleGroups());
        console.log("Sessions de cours: ", getCourseSessions());
        console.log("Session de cours avec ID 1: ", getCourseSessionById(1));
        console.log("Ajout session de cours 4: ", createCourseSession({id: 0, name: "Figma pour les Sigma", date: new Date(), city: 'Paris', studentGroup: 1, professor: 1}));
        console.log("Sessions de cours après ajout dedans: ",getCourseSessions());
        console.log("Changement session 1: ", updateCourseSession(1, {id: 1, name: "VueJS", date: new Date(), city: 'Paris', studentGroup: 1, professor: 1}));
        console.log("Sessions de cours après update session dedans: ",getCourseSessions());
        console.log("Suppression de la session 2: ", deleteCourseSession(2));
        console.log("Sessions de cours après suppression dedans: ", getCourseSessions());
        console.log("Assignation du professeur 1 à la session 1: ", assignProfessorToCourseSession(1, 1));
        console.log("Sessions de cours triées par date: ", getCourseSessionsSortedByDate());
        console.log("Sessions de cours en janvier 2022: ", getCourseSessionsByDate(0, 2022));
        console.log("Sessions de cours à Paris: ", getCourseSessionsByCity('Paris'));
        console.log("Etudiants ayant plus de 2 cours: ", countStudentsWithMoreThanXCourses(2));
        console.log("Session de cours avec le plus d'étudiants: ", getCourseSessionWithMostStudents());
        console.log("Professeurs avec plus d'une session: ", getProfessorsInMultipleSessions());
        console.log("Professeurs enseignant à Paris: ", professorTeachesInCity(1, 'Paris'));
        console.log("Top 3 étudiants récurrents par professeur: ", getTop3RecurringStudentsPerProfessor());
        console.log("Création de groupes de TP: ", createTPGroups());
    }, []);

    return (
        <ChakraProvider>
        <Box p={4}>
            <Heading as="h1" mb={4}>Gestion d'école</Heading>

            {/* Action and Filter */}
            <Stack direction="row" mb={4}>
            <Select placeholder="Selectionner une action" value={action} onChange={(e) => setAction(e.target.value)}>
                <option value="students">Trouver un étudiant</option>
                <option value="courseSessions">Trouver une session de cours</option>
                <option value="studentGroups">Trouver un groupe d'étudiant</option>
                <option value="professors">Trouver un professeur</option>
            </Select>
            <Input placeholder="Filter..." value={filterText} onChange={(e) => setFilterText(e.target.value)} />
            </Stack>

            <AnimatePresence>
                <motion.div initial="hidden" animate="visible" exit="hidden">
                {/* Wrap all DataTable components in a single parent element */}
                <Box>
                    <DataTable title={action.charAt(0).toUpperCase() + action.slice(1)} data={filteredData} rowVariants={rowVariants} /> {/* Only show the relevant table */}
                </Box>
                </motion.div>
            </AnimatePresence>
        </Box>
        </ChakraProvider>
    );
}

export default App;
