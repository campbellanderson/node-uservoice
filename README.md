# uservoice
 A simple node library for uservoice Private Applications

## Install
<pre>
  npm install uservoice
</pre>
## Usage
### Request
```javascript
var UserVoice = require('uservoice');

var uservoiceRequest = new UserVoice(CONSUMER_KEY, CONSUMER_SECRET, ACCOUNT_SUBDOMAIN);
uservoiceRequest.get({
                url:"tickets/search.json",
                data:{
                    query: "from:xxx@xxx.com"
                }
            },
            function (err, ticketsResp)
            {
                if (err) {
                    console.log( err );
                    return res.json(400, {error: 'Unable to contact UserVoice'});
                }
                res.json(200, ticketsResp);
                });
            });
```
### Response
```javascript
{
  "response_data": {
    "query": "from:xxx@xxx.com",
    "page": 1,
    "per_page": 10,
    "total_records": 1,
    "filter": "all",
    "sort": "newest"
  },
  "tickets": [
    {
      "id": 881xxx,
      "ticket_number": 2,
      "subject": "I need help with blah",
      "state": "open",
      "url": "https://ACCOUNT_SUBDOMAIN.uservoice.com/admin/tickets/2",
      "custom_fields": [],
      "messages": [
        {
          "id": 154xxxx,
          "channel": "web",
          "body": "Yeah this is just a test",
          "plaintext_body": "Yeah this is just a test",
          "is_admin_response": false,
          "sender": {
            "id": 359xxxx,
            "name": "xxx xxx",
            "email": "xxx@xxx.com",
            "title": "Chief something",
            "url": "http://ACCOUNT_SUBDOMAIN.uservoice.com/users/359xxx-xxx-xxx",
            "avatar_url": "https://secure.gravatar.com/avatar/de08d7e1d3f96e8xxxxxx?size=70&amp;default=https://cdn.uservoice.com/images/admin/icons/user_70.png",
            "karma_score": 0,
            "created_at": "2013/05/06 12:03:44 +0000",
            "updated_at": "2013/05/15 13:24:41 +0000"
          },
          "attachments": [],
          "created_at": "2013/05/15 13:38:11 +0000",
          "updated_at": "2013/05/15 13:38:11 +0000"
        }
      ],
      "notes": [],
      "assignee": {
        "id": 359xxx,
        "name": "xxx xxx",
        "email": "xxx@xxx.com",
        "title": "Chief something",
        "url": "http://ACCOUNT_SUBDOMAIN.uservoice.com/users/359xxx-xxx-xxx",
        "avatar_url": "https://secure.gravatar.com/avatar/de08d7e1d3f96e8d0799b8xxx?size=70&amp;default=https://cdn.uservoice.com/images/admin/icons/user_70.png",
        "karma_score": 0,
        "created_at": "2013/05/06 12:03:44 +0000",
        "updated_at": "2013/05/15 13:24:41 +0000"
      },
      "created_by": {
        "id": 359xxx,
        "name": "xxx xxx",
        "email": "xxx@xxx.com",
        "title": "Chief something",
        "url": "http://ACCOUNT_SUBDOMAIN.uservoice.com/users/359xxx-xxx-xxx",
        "avatar_url": "https://secure.gravatar.com/avatar/de08d7e1d3f96e8d0799b8xxx?size=70&amp;default=https://cdn.uservoice.com/images/admin/icons/user_70.png",
        "karma_score": 0,
        "created_at": "2013/05/06 12:03:44 +0000",
        "updated_at": "2013/05/15 13:24:41 +0000"
      },
      "updated_by": {
        "id": 359xxx,
        "name": "xxx xxx",
        "email": "xxx@xxx.com",
        "title": "Chief something",
        "url": "http://ACCOUNT_SUBDOMAIN.uservoice.com/users/359xxx-xxx-xxx",
        "avatar_url": "https://secure.gravatar.com/avatar/de08d7e1d3f96e8d0799b8xxx?size=70&amp;default=https://cdn.uservoice.com/images/admin/icons/user_70.png",
        "karma_score": 0,
        "created_at": "2013/05/06 12:03:44 +0000",
        "updated_at": "2013/05/15 13:24:41 +0000"
      },
      "contact": {
        "id": 359xxx,
        "name": "xxx xxx",
        "email": "xxx@xxx.com",
        "title": "Chief something",
        "url": "http://ACCOUNT_SUBDOMAIN.uservoice.com/users/359xxx-xxx-xxx",
        "avatar_url": "https://secure.gravatar.com/avatar/de08d7e1d3f96e8d0799b8xxx?size=70&amp;default=https://cdn.uservoice.com/images/admin/icons/user_70.png",
        "karma_score": 0,
        "created_at": "2013/05/06 12:03:44 +0000",
        "updated_at": "2013/05/15 13:24:41 +0000"
      },
      "last_message_at": "2013/05/15 13:38:11 +0000",
      "created_at": "2013/05/15 13:38:11 +0000",
      "updated_at": "2013/05/15 13:38:11 +0000"
    }
  ]
}
```
## Docs
https://developer.uservoice.com/docs/api/reference

Enjoy! - Campbell Anderson <https://github.com/campbellanderson>