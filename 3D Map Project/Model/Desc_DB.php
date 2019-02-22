<?php
require_once('Database.php');

function get_mosque($id) //queries mosque from the database with specified id
{
    //Post: returns array of all fields for the mosque if exists
    //      returns FALSE if it does not

    global $db;

    $sql = '    SELECT * FROM mosque
                WHERE id = :id  ';

    $stmt = $db->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();

    $mosque = $stmt->fetch();
    $stmt->closeCursor();

    return $mosque;
}

function get_preceding_mosque_names($id) //queries mosque names from the database that precede mosque with specified id
{
    //Post: returns array of all mosque names that precede the mosque with specifed id that exist
    //      returns empty array if none do

    global $db;

    $sql = '    SELECT name FROM mosque
                WHERE id IN 
                (
                    SELECT precedes FROM connection
                    WHERE succedes = :id
                    ORDER BY name
                )';

    $stmt = $db->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();

    $precedes = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
    $stmt->closeCursor();

    return $precedes;
}

function get_succeeding_mosque_names($id) //queries mosque names from the database that succede mosque with specified id
{
    //Post: returns array of all mosque names that precede the mosque with specified id that exist
    //      returns empty array if none do

    global $db;

    $sql = '    SELECT name FROM mosque
                WHERE id IN
                (
                    SELECT succedes FROM connection
                    WHERE precedes = :id
                )';

    $stmt = $db->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();

    $succedes = $stmt->fetchALL(PDO::FETCH_COLUMN, 0);
    $stmt->closeCursor();

    return $succedes;
}
 