<div class="email-content">
    {% if detail404 %}
        <div class="email-content-header pure-g">
            <div class="pure-u-1-2">
                <h1 class="email-content-title">Email Not Found</h1>
            </div>
        </div>
    {% elseif detail %}
        <div class="email-content-header pure-g">
            <div class="pure-u-1-2">
                <h1 class="email-content-title">{{ detail.subject }}</h1>
                <p class="email-content-subtitle">
                    From <a>{{ detail.name }}</a> at <span>{{ detail.time }}</span>
                </p>
            </div>

            <div class="email-content-controls pure-u-1-2">
                <button class="secondary-button pure-button">Reply</button>
                <button class="secondary-button pure-button">Forward</button>
                <button class="secondary-button pure-button">Move to</button>
            </div>
        </div>
        <div class="email-content-body">
            {% for p in detail.content %}
                <p>{{ p }}</p>
            {% endfor %}
        </div>
    {% else %}
        <div class="email-content-header pure-g">
            <div class="pure-u-1-2">
                <h1 class="email-content-title">No Email Selected</h1>
            </div>
        </div>
    {% endif %}
</div>