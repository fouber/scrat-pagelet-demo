{% extends '../layout/layout.tpl' %}
{% block body %}
    <div class="index-nav">
        {% require $id='nav' %}
    </div>
    {% pagelet $id="main" class="index-main" %}
        {% if page404 %}
            {% require $id='404' %}
        {% elseif list %}
            <div class="index-list">
                {% require $id='list' %}
            </div>
            {% pagelet $id="detail" class="index-detail" %}
                {% require $id='detail' %}
            {% endpagelet %}
        {% endif %}
    {% endpagelet %}
    {% require $id='./index.css' %}
{% endblock %}