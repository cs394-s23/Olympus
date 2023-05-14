import csv
import json

csv_file_path = "New_data.csv"
json_file_path = "new_data_1RM.json"

# Open the CSV file
with open(csv_file_path, "r") as csv_file:
    csv_reader = csv.DictReader(csv_file)

    # Create an empty dictionary to store the data
    data = {}

    # Iterate over each row in the CSV file
    for row in csv_reader:
        exercise_name = row["Exercise Name"]
        athlete_name = row["Athlete Name"]

        # Create a new list for the workout name if it doesn't exist
        if athlete_name not in data:
            data[athlete_name] = {}
        if exercise_name not in data[athlete_name]:
            data[athlete_name][exercise_name] = []

        # Create a new object for each row and append it to the list
        workout_object = {
            "Unique ID": row["Unique ID"],
            "Date": row["Date"],
            "Workout Name": row["Workout Name"],
            "Exercise Name": row["Exercise Name"],
            "Set Number": row["Set Number"],
            "Weight": row["Weight"],
            "Reps": row["Reps"],
            "Volume": row["Volume"],
            "RPE": row["RPE"],
            "% 1RM": row["% 1RM"],
            "E 1RM": row["E 1RM"]
        }
        
        data[athlete_name][exercise_name].append(workout_object)
    print(data.keys())

# Write the data to a JSON file
with open(json_file_path, "w") as json_file:
    json.dump(data, json_file, indent=4)
