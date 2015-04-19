{% extends '../layout/layout.tpl' %}
{% block body %}
    <div class="index-nav">
        {% require 'nav' %}
    </div>
    {% pagelet $id="main" class="index-main" %}
        {% if page404 %}
            {% require '404' %}
        {% elseif list %}
            <div class="index-list">
                {% require 'list' %}
            </div>
            {% pagelet $id="detail" class="index-detail" %}
                {% require 'detail' %}
            {% endpagelet %}
        {% endif %}
    {% endpagelet %}
    {% require './index.css' %}
{% endblock %}