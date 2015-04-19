<div class="list pure-u-1">
    {% for val in list %}
    <a href="/{{ nav.current }}?detail={{ val._id }}" data-pagelets="layout.main.detail">
        <div class="email-item email-item-{{ val.status }} pure-g" data-id="{{ val._id }}">
            <div class="pure-u">
                <img class="email-avatar" alt="Tilo Mitra's avatar" height="64" width="64" src="{{ val.avatar }}">
            </div>
            <div class="pure-u-3-4">
                <h5 class="email-name">{{ val.name }}</h5>
                <h4 class="email-subject">{{ val.subject }}</h4>
                <p class="email-desc">{{ val.desc }}</p>
            </div>
        </div>
    </a>
    {% endfor %}
</div>
{% script %}
    require('./list.js');
{% endscript %}