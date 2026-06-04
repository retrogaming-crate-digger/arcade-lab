#!/usr/bin/env node
// ============================================================
// MAME Sample Brain — Scanner
// Lit ../Multimedia/, croise avec metadata, écrit games.json
// Usage: node scan.js
// ============================================================

const fs = require('fs');
const path = require('path');

// ---- CONFIG ---------------------------------------------------
const ROOT = path.resolve(__dirname, '..', 'Multimedia');
const SOUNDTRACK_DIR = path.join(ROOT, 'soundtrack');
const MIDI_DIR      = path.join(ROOT, 'midi');
const VIDEOSNAPS_DIR = path.join(ROOT, 'videosnaps');
const OUTPUT = path.join(__dirname, 'games.json');

// ---- METADATA -------------------------------------------------
// Base de connaissance des jeux. Si un dossier soundtrack/ n'a pas
// d'entrée ici, le scanner l'inclura quand même en "unknown".
const METADATA = {
  "10yard":   { titre: "10-Yard Fight", editeur: "Irem", genre: "sports", annee: 1983, mood: "sport", hardware: "misc" },
  "1941":     { titre: "1941: Counter Attack", editeur: "Capcom", genre: "shmup", annee: 1990, mood: "military", hardware: "CPS1" },
  "1942":     { titre: "1942", editeur: "Capcom", genre: "shmup", annee: 1984, mood: "military", hardware: "misc" },
  "1943":     { titre: "1943: The Battle of Midway", editeur: "Capcom", genre: "shmup", annee: 1987, mood: "military", hardware: "misc" },
  "1943kai":  { titre: "1943 Kai", editeur: "Capcom", genre: "shmup", annee: 1988, mood: "military", hardware: "misc" },
  "1944":     { titre: "1944: The Loop Master", editeur: "Capcom", genre: "shmup", annee: 2000, mood: "military", hardware: "CPS2" },
  "19xx":     { titre: "19XX: The War Against Destiny", editeur: "Capcom", genre: "shmup", annee: 1996, mood: "military", hardware: "CPS2" },
  "3countb":  { titre: "3 Count Bout", editeur: "SNK", genre: "fighting", annee: 1993, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "4dwarrio": { titre: "4-D Warriors", editeur: "Sega", genre: "shmup", annee: 1985, mood: "sci-fi", hardware: "misc" },
  "500gp":    { titre: "500 GP", editeur: "Sega", genre: "racing", annee: 1998, mood: "sport", hardware: "misc" },
  "64street": { titre: "64th Street", editeur: "Jaleco", genre: "beat'em up", annee: 1991, mood: "street", hardware: "misc" },
  "720":      { titre: "720°", editeur: "Atari", genre: "sports", annee: 1986, mood: "street", hardware: "misc" },
  "88games":  { titre: "'88 Games", editeur: "Konami", genre: "sports", annee: 1988, mood: "sport", hardware: "misc" },
  "abcop":    { titre: "A.B. Cop", editeur: "Sega", genre: "racing", annee: 1990, mood: "street", hardware: "misc" },
  "aburner2": { titre: "After Burner II", editeur: "Sega", genre: "shmup", annee: 1987, mood: "military", hardware: "misc" },
  "aceattac": { titre: "Ace Attacker", editeur: "Sega", genre: "sports", annee: 1988, mood: "sport", hardware: "misc" },
  "acedrvrw": { titre: "Ace Driver", editeur: "Namco", genre: "racing", annee: 1994, mood: "sport", hardware: "misc" },
  "actfancr": { titre: "Act Fancer", editeur: "Data East", genre: "platformer", annee: 1989, mood: "sci-fi", hardware: "misc" },
  "aerofgt":  { titre: "Aero Fighters", editeur: "Video System", genre: "shmup", annee: 1992, mood: "military", hardware: "misc" },
  "afighter": { titre: "Action Fighter", editeur: "Sega", genre: "shmup", annee: 1986, mood: "military", hardware: "System 16" },
  "ainferno": { titre: "Air Inferno", editeur: "Taito", genre: "shmup", annee: 1990, mood: "military", hardware: "misc" },
  "airbustr": { titre: "Air Buster", editeur: "Kaneko", genre: "shmup", annee: 1990, mood: "sci-fi", hardware: "misc" },
  "alcon":    { titre: "Alcon / Slap Fight", editeur: "Toaplan", genre: "shmup", annee: 1986, mood: "sci-fi", hardware: "misc" },
  "alexkidd": { titre: "Alex Kidd", editeur: "Sega", genre: "platformer", annee: 1986, mood: "arcade classic", hardware: "System 16" },
  "aliensyn": { titre: "Alien Syndrome", editeur: "Sega", genre: "run'n'gun", annee: 1987, mood: "sci-fi", hardware: "System 16" },
  "alpham2":  { titre: "Alpha Mission II", editeur: "SNK", genre: "shmup", annee: 1991, mood: "sci-fi", hardware: "Neo-Geo MVS" },
  "alpinerd": { titre: "Alpine Racer", editeur: "Namco", genre: "racing", annee: 1994, mood: "sport", hardware: "misc" },
  "alpinesa": { titre: "Alpine Surfer", editeur: "Namco", genre: "racing", annee: 1996, mood: "sport", hardware: "misc" },
  "altbeast": { titre: "Altered Beast", editeur: "Sega", genre: "beat'em up", annee: 1988, mood: "dark", hardware: "System 16" },
  "amazon":   { titre: "Soldier of Light", editeur: "Tecmo", genre: "platformer", annee: 1986, mood: "fantasy", hardware: "misc" },
  "aof":      { titre: "Art of Fighting", editeur: "SNK", genre: "fighting", annee: 1992, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "aof2":     { titre: "Art of Fighting 2", editeur: "SNK", genre: "fighting", annee: 1994, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "aof3":     { titre: "Art of Fighting 3", editeur: "SNK", genre: "fighting", annee: 1996, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "aquajack": { titre: "Aqua Jack", editeur: "Taito", genre: "shmup", annee: 1990, mood: "military", hardware: "misc" },
  "aquarush": { titre: "Aqua Rush", editeur: "Taito", genre: "puzzle", annee: 1999, mood: "arcade classic", hardware: "misc" },
  "arabian":  { titre: "Arabian", editeur: "Sun Electronics", genre: "platformer", annee: 1983, mood: "fantasy", hardware: "misc" },
  "area51":   { titre: "Area 51", editeur: "Atari", genre: "shmup", annee: 1995, mood: "sci-fi", hardware: "misc" },
  "argus":    { titre: "Argus", editeur: "Jaleco", genre: "shmup", annee: 1986, mood: "sci-fi", hardware: "misc" },
  "arkanoid": { titre: "Arkanoid", editeur: "Taito", genre: "puzzle", annee: 1986, mood: "arcade classic", hardware: "misc" },
  "arkarea":  { titre: "Ark Area", editeur: "UPL", genre: "shmup", annee: 1987, mood: "sci-fi", hardware: "misc" },
  "arknoid2": { titre: "Arkanoid: Revenge of Doh", editeur: "Taito", genre: "puzzle", annee: 1987, mood: "arcade classic", hardware: "misc" },
  "assault":  { titre: "Assault", editeur: "Namco", genre: "shmup", annee: 1988, mood: "military", hardware: "misc" },
  "asterix":  { titre: "Asterix", editeur: "Konami", genre: "beat'em up", annee: 1992, mood: "fantasy", hardware: "misc" },
  "astorm":   { titre: "Alien Storm", editeur: "Sega", genre: "beat'em up", annee: 1990, mood: "sci-fi", hardware: "System 16" },
  "asuka":    { titre: "Asuka & Asuka", editeur: "Taito", genre: "shmup", annee: 1988, mood: "military", hardware: "misc" },
  "atetris":  { titre: "Atari Tetris", editeur: "Atari", genre: "puzzle", annee: 1988, mood: "arcade classic", hardware: "misc" },
  "athena":   { titre: "Athena", editeur: "SNK", genre: "platformer", annee: 1986, mood: "fantasy", hardware: "misc" },
  "aurail":   { titre: "Aurail", editeur: "Sega", genre: "shmup", annee: 1990, mood: "sci-fi", hardware: "System 16" },
  "avengers": { titre: "Avengers", editeur: "Capcom", genre: "beat'em up", annee: 1987, mood: "street", hardware: "misc" },
  "backfire": { titre: "Backfire!", editeur: "Data East", genre: "racing", annee: 1995, mood: "sport", hardware: "misc" },
  "baddudes": { titre: "Bad Dudes vs. DragonNinja", editeur: "Data East", genre: "beat'em up", annee: 1988, mood: "street", hardware: "misc" },
  "bakutotu": { titre: "Bakutotsu Kijuutei", editeur: "Namco", genre: "shmup", annee: 1988, mood: "sci-fi", hardware: "misc" },
  "balonfgt": { titre: "Balloon Fight", editeur: "Nintendo", genre: "platformer", annee: 1984, mood: "arcade classic", hardware: "misc" },
  "bankp":    { titre: "Bank Panic", editeur: "Sanritsu", genre: "shmup", annee: 1984, mood: "arcade classic", hardware: "misc" },
  "battlnts": { titre: "Battlantis", editeur: "Konami", genre: "shmup", annee: 1987, mood: "fantasy", hardware: "misc" },
  "bayroute": { titre: "Bay Route", editeur: "Sega", genre: "run'n'gun", annee: 1989, mood: "military", hardware: "System 16" },
  "blazeon":  { titre: "Blaze On", editeur: "Atlus", genre: "shmup", annee: 1992, mood: "sci-fi", hardware: "misc" },
  "blazstar": { titre: "Blazing Star", editeur: "Yumekobo", genre: "shmup", annee: 1998, mood: "sci-fi", hardware: "Neo-Geo MVS" },
  "blockhl":  { titre: "Block Hole / Quarth", editeur: "Konami", genre: "puzzle", annee: 1989, mood: "arcade classic", hardware: "misc" },
  "blswhstl": { titre: "Detana!! TwinBee", editeur: "Konami", genre: "shmup", annee: 1991, mood: "arcade classic", hardware: "misc" },
  "brkthru":  { titre: "Break Thru", editeur: "Data East", genre: "run'n'gun", annee: 1986, mood: "military", hardware: "misc" },
  "bublbobl": { titre: "Bubble Bobble", editeur: "Taito", genre: "platformer", annee: 1986, mood: "arcade classic", hardware: "misc" },
  "bullet":   { titre: "Bullet", editeur: "Sega", genre: "shmup", annee: 1987, mood: "military", hardware: "misc" },
  "circusc":  { titre: "Circus Charlie", editeur: "Konami", genre: "platformer", annee: 1984, mood: "arcade classic", hardware: "misc" },
  "combatsc": { titre: "Combat School", editeur: "Konami", genre: "sports", annee: 1987, mood: "military", hardware: "misc" },
  "contra":   { titre: "Contra", editeur: "Konami", genre: "run'n'gun", annee: 1987, mood: "military", hardware: "misc" },
  "cotton":   { titre: "Cotton", editeur: "Success", genre: "shmup", annee: 1991, mood: "fantasy", hardware: "misc" },
  "cuebrick": { titre: "Cue Brick", editeur: "Konami", genre: "puzzle", annee: 1989, mood: "arcade classic", hardware: "misc" },
  "ddragon":  { titre: "Double Dragon", editeur: "Technos", genre: "beat'em up", annee: 1987, mood: "street", hardware: "misc" },
  "ddragon2": { titre: "Double Dragon II", editeur: "Technos", genre: "beat'em up", annee: 1988, mood: "street", hardware: "misc" },
  "ddragon3": { titre: "Double Dragon 3", editeur: "Technos", genre: "beat'em up", annee: 1990, mood: "street", hardware: "misc" },
  "ddux":     { titre: "Dynamite Düx", editeur: "Sega", genre: "beat'em up", annee: 1988, mood: "arcade classic", hardware: "System 16" },
  "doubledr": { titre: "Double Dribble", editeur: "Konami", genre: "sports", annee: 1986, mood: "sport", hardware: "misc" },
  "dunkshot": { titre: "Dunk Shot", editeur: "Sega", genre: "sports", annee: 1986, mood: "sport", hardware: "misc" },
  "eightman": { titre: "Eight Man", editeur: "SNK", genre: "beat'em up", annee: 1991, mood: "sci-fi", hardware: "Neo-Geo MVS" },
  "exctleag": { titre: "Excite League", editeur: "Sega", genre: "sports", annee: 1989, mood: "sport", hardware: "System 16" },
  "fatfury1": { titre: "Fatal Fury", editeur: "SNK", genre: "fighting", annee: 1991, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "fatfury2": { titre: "Fatal Fury 2", editeur: "SNK", genre: "fighting", annee: 1992, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "fatfury3": { titre: "Fatal Fury 3", editeur: "SNK", genre: "fighting", annee: 1995, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "fightfev": { titre: "Fight Fever", editeur: "Viccom", genre: "fighting", annee: 1994, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "fpoint":   { titre: "Flash Point", editeur: "Sega", genre: "puzzle", annee: 1989, mood: "arcade classic", hardware: "System 16" },
  "galaxyfg": { titre: "Galaxy Fight", editeur: "Sunsoft", genre: "fighting", annee: 1995, mood: "sci-fi", hardware: "Neo-Geo MVS" },
  "garou":    { titre: "Garou: Mark of the Wolves", editeur: "SNK", genre: "fighting", annee: 1999, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "gijoe":    { titre: "G.I. Joe", editeur: "Konami", genre: "run'n'gun", annee: 1992, mood: "military", hardware: "misc" },
  "goldnaxe": { titre: "Golden Axe", editeur: "Sega", genre: "beat'em up", annee: 1989, mood: "fantasy", hardware: "System 16" },
  "gpilots":  { titre: "Ghost Pilots", editeur: "SNK", genre: "shmup", annee: 1991, mood: "military", hardware: "Neo-Geo MVS" },
  "hangon":   { titre: "Hang-On", editeur: "Sega", genre: "racing", annee: 1985, mood: "sport", hardware: "misc" },
  "hangonjr": { titre: "Hang-On Jr.", editeur: "Sega", genre: "racing", annee: 1985, mood: "sport", hardware: "misc" },
  "harddunk": { titre: "Hard Dunk", editeur: "Sega", genre: "sports", annee: 1994, mood: "sport", hardware: "misc" },
  "hexion":   { titre: "Hexion", editeur: "Konami", genre: "puzzle", annee: 1992, mood: "arcade classic", hardware: "misc" },
  "hwchamp":  { titre: "Heavyweight Champ", editeur: "Sega", genre: "sports", annee: 1987, mood: "sport", hardware: "System 16" },
  "hyperspt": { titre: "Hyper Sports", editeur: "Konami", genre: "sports", annee: 1984, mood: "sport", hardware: "misc" },
  "ikari":    { titre: "Ikari Warriors", editeur: "SNK", genre: "run'n'gun", annee: 1986, mood: "military", hardware: "misc" },
  "imgfight": { titre: "Image Fight", editeur: "Irem", genre: "shmup", annee: 1988, mood: "sci-fi", hardware: "misc" },
  "imsorry":  { titre: "I'm Sorry", editeur: "Coreland", genre: "maze", annee: 1985, mood: "arcade classic", hardware: "misc" },
  "insector": { titre: "Insector X", editeur: "Taito", genre: "shmup", annee: 1989, mood: "sci-fi", hardware: "misc" },
  "inyourfa": { titre: "In Your Face", editeur: "Namco", genre: "sports", annee: 1991, mood: "sport", hardware: "misc" },
  "iron":     { titre: "Iron Clad", editeur: "Saurus", genre: "shmup", annee: 1996, mood: "military", hardware: "Neo-Geo MVS" },
  "irrmaze":  { titre: "Irritating Maze", editeur: "Namco", genre: "maze", annee: 1997, mood: "arcade classic", hardware: "misc" },
  "jackal":   { titre: "Jackal", editeur: "Konami", genre: "run'n'gun", annee: 1986, mood: "military", hardware: "misc" },
  "jailbrek": { titre: "Jail Break", editeur: "Konami", genre: "run'n'gun", annee: 1986, mood: "street", hardware: "misc" },
  "jajamaru": { titre: "Jajamaru no Daibouken", editeur: "Jaleco", genre: "platformer", annee: 1986, mood: "fantasy", hardware: "misc" },
  "jchan":    { titre: "Jackie Chan", editeur: "Kaneko", genre: "fighting", annee: 1995, mood: "street", hardware: "misc" },
  "journey":  { titre: "Journey", editeur: "Bally Midway", genre: "shmup", annee: 1983, mood: "arcade classic", hardware: "misc" },
  "kabukikl": { titre: "Kabuki Klash", editeur: "Hudson", genre: "fighting", annee: 1995, mood: "fantasy", hardware: "Neo-Geo MVS" },
  "kof94":    { titre: "King of Fighters '94", editeur: "SNK", genre: "fighting", annee: 1994, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "kof95":    { titre: "King of Fighters '95", editeur: "SNK", genre: "fighting", annee: 1995, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "kof96":    { titre: "King of Fighters '96", editeur: "SNK", genre: "fighting", annee: 1996, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "kotm":     { titre: "King of the Monsters", editeur: "SNK", genre: "fighting", annee: 1991, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "kotm2":    { titre: "King of the Monsters 2", editeur: "SNK", genre: "fighting", annee: 1992, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "lifefrce": { titre: "Lifeforce", editeur: "Konami", genre: "shmup", annee: 1986, mood: "sci-fi", hardware: "misc" },
  "lresort":  { titre: "Last Resort", editeur: "SNK", genre: "shmup", annee: 1992, mood: "sci-fi", hardware: "Neo-Geo MVS" },
  "magdrop2": { titre: "Magical Drop II", editeur: "Data East", genre: "puzzle", annee: 1996, mood: "arcade classic", hardware: "Neo-Geo MVS" },
  "magdrop3": { titre: "Magical Drop III", editeur: "Data East", genre: "puzzle", annee: 1997, mood: "arcade classic", hardware: "Neo-Geo MVS" },
  "maglord":  { titre: "Magician Lord", editeur: "Alpha Denshi", genre: "platformer", annee: 1990, mood: "fantasy", hardware: "Neo-Geo MVS" },
  "matrim":   { titre: "Matrimelee", editeur: "Noise Factory", genre: "fighting", annee: 2002, mood: "neo-geo punch", hardware: "Neo-Geo MVS" },
  "miexchng": { titre: "Money Idol Exchanger", editeur: "Face", genre: "puzzle", annee: 1997, mood: "arcade classic", hardware: "Neo-Geo MVS" },
  "mmaulers": { titre: "Mighty Maulers", editeur: "Video System", genre: "sports", annee: 1994, mood: "sport", hardware: "Neo-Geo MVS" },
  "mrgoemon": { titre: "Mr. Goemon", editeur: "Konami", genre: "platformer", annee: 1986, mood: "fantasy", hardware: "misc" },
  "mslug":    { titre: "Metal Slug", editeur: "SNK", genre: "run'n'gun", annee: 1996, mood: "military", hardware: "Neo-Geo MVS" },
  "mslug2":   { titre: "Metal Slug 2", editeur: "SNK", genre: "run'n'gun", annee: 1998, mood: "military", hardware: "Neo-Geo MVS" },
  "mslug3":   { titre: "Metal Slug 3", editeur: "SNK", genre: "run'n'gun", annee: 2000, mood: "military", hardware: "Neo-Geo MVS" },
  "mslug4":   { titre: "Metal Slug 4", editeur: "SNK", genre: "run'n'gun", annee: 2002, mood: "military", hardware: "Neo-Geo MVS" },
  "mslug5":   { titre: "Metal Slug 5", editeur: "SNK", genre: "run'n'gun", annee: 2003, mood: "military", hardware: "Neo-Geo MVS" },
  "mslugx":   { titre: "Metal Slug X", editeur: "SNK", genre: "run'n'gun", annee: 1999, mood: "military", hardware: "Neo-Geo MVS" },
  "mvp":      { titre: "MVP", editeur: "Sega", genre: "sports", annee: 1989, mood: "sport", hardware: "System 16" },
  "nam1975":  { titre: "NAM-1975", editeur: "SNK", genre: "run'n'gun", annee: 1990, mood: "military", hardware: "Neo-Geo MVS" },
  "nastar":   { titre: "Nastar / Rastan Saga II", editeur: "Taito", genre: "beat'em up", annee: 1988, mood: "fantasy", hardware: "misc" },
  "nebulray": { titre: "Nebulas Ray", editeur: "Namco", genre: "shmup", annee: 1994, mood: "sci-fi", hardware: "misc" },
  "nightstr": { titre: "Night Striker", editeur: "Taito", genre: "shmup", annee: 1989, mood: "sci-fi", hardware: "misc" },
  "ninjak":   { titre: "Ninja Kids", editeur: "Taito", genre: "beat'em up", annee: 1990, mood: "fantasy", hardware: "misc" },
  "ninjakd2": { titre: "Ninja-Kid II", editeur: "UPL", genre: "platformer", annee: 1987, mood: "fantasy", hardware: "misc" },
  "ninjakun": { titre: "Ninja-Kun", editeur: "UPL", genre: "platformer", annee: 1984, mood: "fantasy", hardware: "misc" },
  "overtop":  { titre: "Over Top", editeur: "ADK", genre: "racing", annee: 1996, mood: "sport", hardware: "Neo-Geo MVS" },
  "parodius": { titre: "Parodius", editeur: "Konami", genre: "shmup", annee: 1990, mood: "arcade classic", hardware: "misc" },
  "passsht":  { titre: "Passing Shot", editeur: "Sega", genre: "sports", annee: 1988, mood: "sport", hardware: "System 16" },
  "pbobblen": { titre: "Puzzle Bobble", editeur: "Taito", genre: "puzzle", annee: 1994, mood: "arcade classic", hardware: "Neo-Geo MVS" },
  "pingpong": { titre: "Konami's Ping Pong", editeur: "Konami", genre: "sports", annee: 1985, mood: "sport", hardware: "misc" },
  "pong":     { titre: "Pong", editeur: "Atari", genre: "sports", annee: 1972, mood: "arcade classic", hardware: "misc" },
  "pooyan":   { titre: "Pooyan", editeur: "Konami", genre: "shmup", annee: 1982, mood: "arcade classic", hardware: "misc" },
  "pspikes2": { titre: "Power Spikes II", editeur: "Video System", genre: "sports", annee: 1994, mood: "sport", hardware: "Neo-Geo MVS" },
  "qcrayon2": { titre: "Quiz Crayon 2", editeur: "Taito", genre: "quiz", annee: 1993, mood: "arcade classic", hardware: "misc" },
  "qsww":     { titre: "Quiz Sword", editeur: "Taito", genre: "quiz", annee: 1996, mood: "fantasy", hardware: "misc" },
  "quartet":  { titre: "Quartet", editeur: "Sega", genre: "run'n'gun", annee: 1986, mood: "sci-fi", hardware: "misc" },
  "quester":  { titre: "Quester", editeur: "Namco", genre: "puzzle", annee: 1987, mood: "arcade classic", hardware: "misc" },
  "quizhq":   { titre: "Quiz HQ", editeur: "Taito", genre: "quiz", annee: 1990, mood: "arcade classic", hardware: "misc" },
  "raiden":   { titre: "Raiden", editeur: "Seibu Kaihatsu", genre: "shmup", annee: 1990, mood: "military", hardware: "misc" },
  "robokid":  { titre: "Atomic Robo-Kid", editeur: "UPL", genre: "shmup", annee: 1988, mood: "sci-fi", hardware: "misc" },
  "rungun":   { titre: "Run and Gun", editeur: "Konami", genre: "sports", annee: 1993, mood: "sport", hardware: "misc" },
  "salamand": { titre: "Salamander", editeur: "Konami", genre: "shmup", annee: 1986, mood: "sci-fi", hardware: "misc" },
  "simpsons": { titre: "The Simpsons", editeur: "Konami", genre: "beat'em up", annee: 1991, mood: "street", hardware: "misc" },
  "ssriders": { titre: "Sunset Riders", editeur: "Konami", genre: "run'n'gun", annee: 1991, mood: "street", hardware: "misc" },
  "thndrx2":  { titre: "Thunder Dragon 2", editeur: "NMK", genre: "shmup", annee: 1993, mood: "military", hardware: "misc" },
  "thunderx": { titre: "Thunder Cross", editeur: "Konami", genre: "shmup", annee: 1988, mood: "sci-fi", hardware: "misc" },
  "timeplt":  { titre: "Time Pilot", editeur: "Konami", genre: "shmup", annee: 1982, mood: "military", hardware: "misc" },
  "timescan": { titre: "Time Scanner", editeur: "Sega", genre: "pinball", annee: 1987, mood: "arcade classic", hardware: "System 16" },
  "turfmast": { titre: "Neo Turf Masters", editeur: "Nazca", genre: "sports", annee: 1996, mood: "sport", hardware: "Neo-Geo MVS" },
  "tutankhm": { titre: "Tutankham", editeur: "Konami", genre: "maze", annee: 1982, mood: "dark", hardware: "misc" },
  "twinspri": { titre: "Twinkle Star Sprites", editeur: "ADK", genre: "shmup", annee: 1996, mood: "fantasy", hardware: "Neo-Geo MVS" },
  "ufosensi": { titre: "UFO Senshi Yohko Chan", editeur: "Sega", genre: "platformer", annee: 1989, mood: "sci-fi", hardware: "misc" },
  "unsquad":  { titre: "U.N. Squadron", editeur: "Capcom", genre: "shmup", annee: 1989, mood: "military", hardware: "CPS1" },
  "uopoko":   { titre: "Puzzloop", editeur: "Cave", genre: "puzzle", annee: 1998, mood: "arcade classic", hardware: "misc" },
  "upndown":  { titre: "Up'n Down", editeur: "Sega", genre: "racing", annee: 1983, mood: "arcade classic", hardware: "misc" },
  "vendetta": { titre: "Vendetta", editeur: "Konami", genre: "beat'em up", annee: 1991, mood: "street", hardware: "misc" },
  "victlapw": { titre: "Ace Driver: Victory Lap", editeur: "Namco", genre: "racing", annee: 1996, mood: "sport", hardware: "misc" },
  "viewpoin": { titre: "Viewpoint", editeur: "Sammy", genre: "shmup", annee: 1992, mood: "sci-fi", hardware: "Neo-Geo MVS" },
  "wakuwak7": { titre: "Waku Waku 7", editeur: "Sunsoft", genre: "fighting", annee: 1996, mood: "fantasy", hardware: "Neo-Geo MVS" },
  "wjammers": { titre: "Windjammers", editeur: "Data East", genre: "sports", annee: 1994, mood: "sport", hardware: "Neo-Geo MVS" },
  "wrestwar": { titre: "Wrestle War", editeur: "Sega", genre: "sports", annee: 1989, mood: "sport", hardware: "System 16" },
  "xexex":    { titre: "Xexex", editeur: "Konami", genre: "shmup", annee: 1991, mood: "sci-fi", hardware: "misc" },
  "xmen":     { titre: "X-Men", editeur: "Konami", genre: "beat'em up", annee: 1992, mood: "sci-fi", hardware: "misc" },
  "xybots":   { titre: "Xybots", editeur: "Atari", genre: "maze", annee: 1987, mood: "sci-fi", hardware: "misc" },
  "yiear":    { titre: "Yie Ar Kung-Fu", editeur: "Konami", genre: "fighting", annee: 1985, mood: "arcade classic", hardware: "misc" },
  "youjyudn": { titre: "Youjyuden", editeur: "Nichibutsu", genre: "shmup", annee: 1986, mood: "sci-fi", hardware: "misc" },
};

// ---- SCAN -----------------------------------------------------
function scan() {
  console.log('🔍 Scanning...');
  console.log(`   soundtrack: ${SOUNDTRACK_DIR}`);
  console.log(`   videosnaps: ${VIDEOSNAPS_DIR}`);

  if (!fs.existsSync(SOUNDTRACK_DIR)) {
    console.error(`❌ Dossier introuvable: ${SOUNDTRACK_DIR}`);
    console.error(`   Vérifie que ce script est dans /MAME/sample-brain/ et que /MAME/Multimedia/ existe.`);
    process.exit(1);
  }

  // 1) Lister les jeux depuis soundtrack/ (source de vérité)
  const romDirs = fs.readdirSync(SOUNDTRACK_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  console.log(`   ${romDirs.length} jeux trouvés dans soundtrack/`);

  // 2) Indexer les fichiers MIDI disponibles (par dossier ROM)
  let midiIndex = {};
  if (fs.existsSync(MIDI_DIR)) {
    fs.readdirSync(MIDI_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .forEach(d => {
        const files = fs.readdirSync(path.join(MIDI_DIR, d.name))
          .filter(f => /\.mid$/i.test(f))
          .sort()
          .map(filename => ({
            filename,
            path: `../Multimedia/midi/${d.name}/${filename}`,
            label: filename.replace(/\.mid$/i, '')
          }));
        if (files.length > 0) midiIndex[d.name] = files;
      });
    const totalMidi = Object.values(midiIndex).reduce((s, f) => s + f.length, 0);
    console.log(`   ${Object.keys(midiIndex).length} jeux avec MIDI (${totalMidi} fichiers)`);
  } else {
    console.log(`   (pas de dossier midi/ — ajoutez des fichiers dans Multimedia/midi/)`);
  }

  // 3) Indexer les vidéos disponibles (flat)
  let videoIndex = new Set();
  if (fs.existsSync(VIDEOSNAPS_DIR)) {
    fs.readdirSync(VIDEOSNAPS_DIR)
      .filter(f => f.toLowerCase().endsWith('.mp4'))
      .forEach(f => videoIndex.add(f.replace(/\.mp4$/i, '')));
    console.log(`   ${videoIndex.size} vidéos indexées`);
  } else {
    console.warn(`⚠️  Pas de dossier videosnaps/, vidéos désactivées`);
  }

  // 4) Construire la liste des jeux
  const games = [];
  let missingMeta = 0;

  for (const rom of romDirs) {
    const gameDir = path.join(SOUNDTRACK_DIR, rom);

    // Lister les pistes audio
    const tracks = fs.readdirSync(gameDir)
      .filter(f => /\.(mp3|ogg|flac|wav)$/i.test(f))
      .sort()
      .map(filename => ({
        filename,
        path: `../Multimedia/soundtrack/${rom}/${filename}`,
        label: filename.replace(/\.(mp3|ogg|flac|wav)$/i, '')
      }));

    if (tracks.length === 0) continue;

    // Métadonnées
    const meta = METADATA[rom];
    if (!meta) {
      missingMeta++;
    }

    // Vidéo associée
    const hasVideo = videoIndex.has(rom);

    games.push({
      rom,
      titre: meta?.titre || rom,
      editeur: meta?.editeur || 'Unknown',
      genre: meta?.genre || 'unknown',
      annee: meta?.annee || null,
      mood: meta?.mood || 'unknown',
      hardware: meta?.hardware || 'unknown',
      tracks,
      midiTracks: midiIndex[rom] || [],
      video: hasVideo ? `../Multimedia/videosnaps/${rom}.mp4` : null,
      trackCount: tracks.length
    });
  }

  // 5) Écrire le JSON
  fs.writeFileSync(OUTPUT, JSON.stringify({ games, generated: new Date().toISOString() }, null, 2));

  console.log(`\n✅ ${games.length} jeux exportés vers ${OUTPUT}`);
  console.log(`   ${games.filter(g => g.video).length} avec vidéo`);
  console.log(`   ${games.reduce((sum, g) => sum + g.trackCount, 0)} pistes audio au total`);
  console.log(`   ${games.filter(g => g.midiTracks.length > 0).length} avec fichiers MIDI`);
  if (missingMeta > 0) {
    console.log(`\n⚠️  ${missingMeta} jeux sans métadonnées (marqués "unknown") — ajoute-les dans scan.js > METADATA`);
  }
}

scan();
