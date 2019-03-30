# generateExpandedInfoData.py
# 
# This script is to be used to generate the necessary data for the "Expanded Info" functionality.
#
# 
# It requires the path of a specially formatted CSV file as its only argument.
#
# For Example: generateExpandedInfoData.py "BIIDProject Sorted Data - Mosque sheet.csv"
#
#
# The format of the CSV file is given here:
#
# Mosque, Latitude, Longitude, Address, Address2, City, County, State, Zip, Number, Website, Primary Ethnicity, 
# Preceded by, Incorporation Date, Opening Date, Relocation Date, Dissolution Date, OpenDate, CloseDate, Odate, 
# Cdate, z,	TimeOpen, Link, AlbumID, LocationID, isHistoric, Founding, Members, History, Description, Photos (exterior), 
# Photos (interior), Photos (people), Video(s), Article(s)\n
# 
# The script then takes the data in that input CSV and generates 2 csv files, "mosque.csv" and "connection.csv".
# These CSV files must be imported into the respective "mosque_description" database table in phpMyAdmin.
#

import re, csv, os, sys
# re:   regular expressions for file validation
# csv:  comma-separated-values file parsing
# os:   file-path parsing
# sys:  command-line argument passing

# DECLARE CONSTANTS
ARG_NUM     = 2
ARG_ERR     = "USAGE: generateExpandedInfoData.py \"path/to/input.csv\""
PATH_ERR    = "The argument does not refer to a valid path on the system!"
RE_CSV      = "^(((\".*\")|([^,]*))[,\n])*$"
RE_ERR      = "The specified file is not a properly-formatted CSV file!"
NULL_F      = "NULL"
UNNAME      = "Unnamed Mosque"
M_OUT_PATH  = "mosque.csv"
C_OUT_PATH  = "connection.csv"

FIELDS = [  
    "Mosque",               # 0
    "Latitude",             # 1
    "Longitude",            # 2
    "Address",              # 3
    "Address2",             # 4
    "City",                 # 5
    "County",               # 6
    "State",                # 7
    "Zip",                  # 8
    "Number",               # 9
    "Website",              # 10
    "Primary Ethnicity",    # 11
    "Preceded by",          # 12
    "Incorporation Date",   # 13
    "Opening Date",         # 14
    "Relocation Date",      # 15
    "Dissolution Date",     # 16
    "OpenDate",             # 17
    "CloseDate",            # 18
    "Odate",                # 19
    "Cdate",                # 20
    "z",                    # 21
    "TimeOpen",             # 22
    "Link",                 # 23
    "AlbumID",              # 24
    "LocationID",           # 25
    "isHistoric",           # 26
    "Founding",             # 27
    "Members",              # 28
    "History",              # 29
    "Description",          # 30
    "Photos (exterior)",    # 31
    "Photos (interior)",    # 32
    "Photos (people)",      # 33
    "Video(s)",             # 34
    "Article(s)"            # 35
    ]

MOSQUE_FIELDS = [
    "id",           # 0
    "name",         # 1
    "address",      # 2
    "phoneNum",     # 3
    "website",      # 4
    "ethnicity",    # 5
    "denomination", # 6
    "incorpDate",   # 7
    "openDate",     # 8
    "relocDate",    # 9
    "dissDate",     # 10
    "fullDesc",     # 11
    "history",      # 12
    "albumId"       # 13
]

CONNECTION_FIELDS = [
    "precedes", # 0
    "succedes"  # 1
]

# non-critical error buffer list
errors = []

# FUNCTION DEFINITIONS:

# function for easily saving non-critical errors
# mosque: a dictionary representing a mosque record
# message: a string containing the error message
def saveError(mosque, message):

    # get "Mosque" field from mosque
    name = mosque.get(FIELDS[0])

    # check if mosque has "Mosque" field
    if name is not None:

        # has "Mosque" field, so don't ignore!

        # check if mosque is unnamed
        if name == '':

            # specify it is unnamed
            name = UNNAME

        # save error in buffer
        errors.append(name + ": " + message)

#--------------------------------------------#
# VALIDATION: ensure script inputs are valid #
#--------------------------------------------#

# check for correct number of arguments
if len(sys.argv) != ARG_NUM:
    # incorrect number of arguments

    # display error
    print(ARG_ERR)

    # force stop
    sys.exit()

# correct number of arguments
# store argument for convenience
inputPath = sys.argv[1]

# check that the path is an actual file on the system
if not os.path.exists(inputPath):
    # file does not exist!

    # display error
    print(PATH_ERR)

    # force stop
    sys.exit()

# file path does exist
# open the file
inputCSV = open(inputPath, newline='', encoding='utf-8')

# get file as string
inputString = inputCSV.read()

# close file
inputCSV.close()

# check that the file data is in csv format
if not re.fullmatch(RE_CSV, inputString):
    # the file data is not in csv format

    # print error
    print(RE_ERR)

    # force stop
    sys.exit()

# the file data is in csv format

#-------------------------------------#
# DATA-READING: read data from inputs #
#-------------------------------------#

# data storage structure
# list of dictionaries representing a mosque and its information fields
records = []

# open validated csvfile for reading
with open(inputPath, newline='', encoding='utf-8') as csvfile:

    # get csv reader for file
    reader = csv.reader(csvfile)

    # for every row (mosque)...
    for row in reader:

        # add new empty dictionary to list
        records.append({})

        # for every field...
        for index, field in enumerate(row):

            # check if field is not empty string
            if field != '':

                # add key and field to dictionary
                records[-1][ FIELDS[index] ] = field

# data has been read

# CAUTION!!
# Missing data will either be an empty string ('') or completely gone!
# If you will access a dictionary item using a key, use:
# mosque.get(key)
# and check that it is not None and then not ''

#-------------------------------------------------#
# DATA-GENERATION: generate new data from storage #
#-------------------------------------------------#

# generated data storage structure
# list of dictionaries representing a mosque and its information fields
mosques = []

# for every mosque (but first mosque (header row)), make a mosque record
for mosque in records[1:]:

    # append an empty dictionary
    mosques.append({})

    if mosque.get(FIELDS[25]) is not None:
        mosques[-1][MOSQUE_FIELDS[0]] = mosque[FIELDS[25]]  # id: LocationID
    
    if mosque.get(FIELDS[0]) is not None:
        mosques[-1][MOSQUE_FIELDS[1]] = mosque[FIELDS[0]]   # name: Mosque

    # address: Address + City + State
    mosques[-1][MOSQUE_FIELDS[2]] = ""                      # intialize to empty string

    if mosque.get(FIELDS[3]) is not None:
        mosques[-1][MOSQUE_FIELDS[2]] += mosque[FIELDS[3]]  # append Address if exists

    if mosque.get(FIELDS[5]) is not None:
        if mosques[-1][MOSQUE_FIELDS[2]] != "":
            mosques[-1][MOSQUE_FIELDS[2]] += " "            # append space if Address exists
        mosques[-1][MOSQUE_FIELDS[2]] += mosque[FIELDS[5]]  # append City if exists

    if mosque.get(FIELDS[7]) is not None:
        if mosques[-1][MOSQUE_FIELDS[2]] != "":             
            mosques[-1][MOSQUE_FIELDS[2]] += ", "           # append comma if Address or City exists
        mosques[-1][MOSQUE_FIELDS[2]] += mosque[FIELDS[7]]  # append State if exists

    if mosques[-1][MOSQUE_FIELDS[2]] == "":
        mosques[-1].pop(MOSQUE_FIELDS[2])                 # remove address key if empty string

    if mosque.get(FIELDS[9]) is not None:
        mosques[-1][MOSQUE_FIELDS[3]] = mosque[FIELDS[9]]   # phoneNum: Number

    if mosque.get(FIELDS[10]) is not None:
        mosques[-1][MOSQUE_FIELDS[4]] = mosque[FIELDS[10]]   # website: Website
    
    if mosque.get(FIELDS[11]) is not None:
        mosques[-1][MOSQUE_FIELDS[5]] = mosque[FIELDS[11]]   # ethnicity: Primary Ethnicity

    # (denomination does not exist in data sheet)

    if mosque.get(FIELDS[13]) is not None:
        mosques[-1][MOSQUE_FIELDS[7]] = mosque[FIELDS[13]]   # incorpDate: Incorporation Date

    if mosque.get(FIELDS[14]) is not None:
        mosques[-1][MOSQUE_FIELDS[8]] = mosque[FIELDS[14]]   # openDate: Opening Date

    if mosque.get(FIELDS[15]) is not None:
        mosques[-1][MOSQUE_FIELDS[9]] = mosque[FIELDS[15]]   # relocDate: Relocation Date

    if mosque.get(FIELDS[16]) is not None:
        mosques[-1][MOSQUE_FIELDS[10]] = mosque[FIELDS[16]]  # dissDate: Dissolution Date

    if mosque.get(FIELDS[30]) is not None:
        mosques[-1][MOSQUE_FIELDS[11]] = mosque[FIELDS[30]]  # fullDesc: Description

    if mosque.get(FIELDS[29]) is not None:
        mosques[-1][MOSQUE_FIELDS[12]] = mosque[FIELDS[29]]  # history: History

    if mosque.get(FIELDS[24]) is not None:
        mosques[-1][MOSQUE_FIELDS[13]] = mosque[FIELDS[24]]  # albumId: AlbumID

# generated data storage structure
# list of dictionaries representing a connection between mosques
connections = []

# for every mosque (but first mosque (header row)), try to make a connection
for mosque in records[1:]:

    # get "LocationID" field for mosque
    locationId = mosque.get(FIELDS[25])

    # get "Preceded by" field for mosque
    precededBy = mosque.get(FIELDS[12])

    # check if mosque has locationID
    if locationId is not None and locationId != '':

        # try to parse int from locationID field
        try:
            
            mosqueAsInt = int(locationId)

            # check if mosque is preceded by any mosques
            if precededBy is not None and precededBy != '':

                # mark whether matching mosque found
                # if so, will be an integer of its LocationID
                # if not, will be False
                found = False

                # try to find matching mosque
                for other in records:

                    # check if names match (discarding extra leading and trailing whitespace)
                    if precededBy == other.get(FIELDS[0]):

                        # names match!

                        # get other mosque's LocationID
                        otherID = other.get(FIELDS[25])

                        # check if other mosque has LocationID
                        if otherID is not None and otherID != '':

                            # try to parse int from LocationID field
                            try:

                                otherAsInt = int(otherID)

                                # all conditions have been met, a connection can be made!
                                
                                # check if hasn't already been found
                                if found is not False:

                                    saveError(other, "Seems to be a duplicated name!")

                                else:

                                    found = otherAsInt

                            except Exception:
                                pass
                
                # done looking for matching mosques

                # check if found or not
                if found is not False:

                    # was found!

                    # make connection
                    connections.append({CONNECTION_FIELDS[0]: found, CONNECTION_FIELDS[1]: mosqueAsInt})

                else:

                    # save error
                    saveError(mosque, precededBy + " does not seem to match any mosques! (Is there a typo?)")

        # locationID was not an int!
        except ValueError:

            # save error
            saveError(mosque, "LocationID is not an integer! (Cannot make connections with other mosques!)")

    else:

        # mosque does not have a LocationID!
        
        # save error
        saveError(mosque, "Does not have a LocationID! (Cannot make connections with other mosques!)")

# all connections that could have been made

#--------------------------------------#
# DATA-OUTPUT: write data from storage #
#--------------------------------------#

# output mosque file
with open(M_OUT_PATH, "w", newline='', encoding='utf-8') as csvfile:

    # create csv dict writer to handle output
    writer = csv.DictWriter(csvfile, MOSQUE_FIELDS, NULL_F, "ignore", quoting=csv.QUOTE_MINIMAL)

    # write all mosques to csv
    writer.writerows(mosques)

# output connection file
with open(C_OUT_PATH, "w", newline='', encoding='utf-8') as csvfile:

    # create csv dict writer to handle output
    writer = csv.DictWriter(csvfile, CONNECTION_FIELDS, NULL_F, "ignore", quoting=csv.QUOTE_MINIMAL)

    # write all connections to csv
    writer.writerows(connections)

# print all saved errors to console
for error in errors:

    print(error)