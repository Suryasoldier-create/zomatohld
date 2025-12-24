<?php
if(!is_dir(__DIR__.'./db')) mkdir(__DIR__.'./db');
if(!defined('db_file')) define('db_file',__DIR__.'./db/grocery_db.db');

function my_udf_md5($string) { return md5($string); }

class DBConnection extends SQLite3 {
    function __construct(){
        $this->open(db_file);
        $this->createFunction('md5', 'my_udf_md5');
        $this->exec("PRAGMA foreign_keys = ON;");
        
        // Table Creations...
        $this->exec("CREATE TABLE IF NOT EXISTS `admin_list` (
            `admin_id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            `fullname` TEXT NOT NULL,
            `username` TEXT NOT NULL,
            `password` TEXT NOT NULL,
            `status` INTEGER NOT NULL Default 1,
            `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )"); 
        
        // ... (Include other CREATE TABLE statements here from original)

        $this->exec("INSERT or IGNORE INTO `admin_list` VALUES (1,'Administrator','admin',md5('admin123'),1, CURRENT_TIMESTAMP)");
    }

    function __destruct(){
        $this->close();
    }
}

$conn = new DBConnection();
?>