import requests
from flask import Flask, jsonify

app = Flask(__name__)

def fetch_instagram(id):
    url = f'https://www.instagram.com/{id}/?__a=1&__d=dis'
    results = requests.get(url)


    insta_info = results.json()

    data = {
        'id': insta_info['graphql']['user']['username'],
        'name': insta_info['graphql']['user']['full_name'],
        'bio': insta_info['graphql']['user']['biography'],
        'followers': insta_info['graphql']['user']['edge_followed_by']['count'],
        'following': insta_info['graphql']['user']['edge_follow']['count'],
        'image': insta_info['graphql']['user']['profile_pic_url_hd'],
    }

    images = insta_info['graphql']['user']['edge_owner_to_timeline_media']['edges']
    img_arr = []
    for image in images:
        image_data = {
            'image': image['node']['display_url'],
            'video': image['node']['is_video'],
            'video_url': image['node']['video_url'] if image['node']['is_video'] else None,
            'likes': image['node']['edge_liked_by']['count'],
            'comments': image['node']['edge_media_to_comment']['count'],
            'id': image['node']['shortcode'],
            'description': image['node']['edge_media_to_caption']['edges'][0]['node']['text']
        }
        img_arr.append(image_data)

    top_image = max(img_arr, key=lambda x: x['likes'])
    data['topImage'] = top_image
    data['imageData'] = img_arr
    latest_post = data['imageData'][0]
    user = {"profile_name_id": data['id'],
            "image": data['image']
            }
    
    final_profile_data = {"user": user, "latestPost": latest_post}
    return final_profile_data

@app.route('/instagram/<string:id>', methods=['GET'])
def get_instagram_data(id):
    data = fetch_instagram(id)
    if not data:
        return jsonify({'error': 'User not found or private account'}), 404
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
