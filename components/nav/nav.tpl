<div class="nav">
    <button class="primary-button pure-button">Compose</button>
    <div class="pure-menu">
        <ul class="pure-menu-list">
            {% for key, val in nav.items %}
                <li class="pure-menu-item">
                    <a href="{{ val.href }}"
                       class="pure-menu-link {{ val.status }}"
                       data-name="{{ key }}"
                       data-pagelets="layout.main">
                        {{ val.label }}
                        {% if val.count %}
                        <span class="email-count">({{ val.count }})</span>
                        {% endif %}
                    </a>
                </li>
            {% endfor %}
            <li class="pure-menu-heading">Labels</li>
            <li class="pure-menu-item">
                <a href="#" class="pure-menu-link">
                    <span class="email-label-personal"></span>Personal
                </a>
            </li>
            <li class="pure-menu-item">
                <a href="#" class="pure-menu-link">
                    <span class="email-label-work"></span>Work
                </a>
            </li>
            <li class="pure-menu-item">
                <a href="#" class="pure-menu-link">
                    <span class="email-label-travel"></span>Travel
                </a>
            </li>
        </ul>
    </div>
</div>
{% script %}
    require('./nav.js');
{% endscript %}