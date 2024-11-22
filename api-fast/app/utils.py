# UTILS

def manhattan(rating1, rating2):
    distance = 0
    for i in rating1:
        for j in rating2:
            if i[0] == j[0]:
                distance += abs(i[1] - j[1])
    return distance


def computeNearestNeighbor(user_id, users):
    distances = []
    for user in users:
        if user != user_id:
            distance = manhattan(users[user], users[user_id])
            distances.append((distance, user))
    distances.sort()
    return distances


def recommend(user_id, users):
    """Give list of recommendations"""
    nearest = computeNearestNeighbor(user_id, users)[0][1]
    recommendations = []
    neighborRatings = users[nearest]
    userRatings = users[user_id]

    for i in neighborRatings:
        for j in userRatings:
            if i[0] == j[0]:
                recommendations.append((i[0], i[1]))

    return sorted(
        recommendations,
        key=lambda artistTuple: artistTuple[1],
        reverse = True
    )