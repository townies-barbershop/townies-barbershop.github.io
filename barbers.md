---
title: Barbers
barbers:
  - name: "Katrina Cook"
    image: "/img/katrina.jpg"
    insta: "katrina.cuts"
    square: "https://katrina-cook.square.site/"
  - name: "Michael Loperena"
    image: "/img/michael.jpg"
    phone: "(407) 738-8651"
    insta: "el_barbu86"
    square: "https://michael-loperena.square.site/"
  - name: "Christopher X. Alvarado"
    image: "/img/chris.jpg"
    phone: "(407) 459-0113"
    insta: "belikebuddha2"
    square: "https://belikebuddha.square.site/"
  - name: "Mick Tyrrell"
    image: "/img/mick.jpg"
    phone: "(239) 810-8092"
    insta: "micktyrrellbarber"
    square: "https://mick-t.square.site/"
  - name: "Colin Davey"
    image: "/img/colin.jpg"
    phone: "(407) 459-3589"
    insta: "bostoncolin"
    square: "https://square.site/book/5CGVSJ9WRXGYM/bostoncolin-orlando-fl"
  - name: "Alex Kuechenmeister"
    image: "/img/alex.jpg"
    phone: "(407) 399-3598"
    insta: "alexkthebarber"
    square: "https://square.site/book/BE2BBS4A7C5DP/alexkthebarber-llc-orlando-fl"
---

<div class="grid-container">
  <div class="grid-x grid-margin-x barbers">
    {% for barber in page.barbers %}
    <div class="cell medium-6 large-4">
      <div class="card">
        <img class="avatar" alt="{{ barber.name }}" src="{{ barber.image }}">
        <div class="info">
          <h2>{{ barber.name }}</h2>
          {% if barber.phone %}<p>Phone: <a href="tel:{{ barber.phone | remove: "(" | remove: ")" | remove: " " | remove: "-" }}">{{ barber.phone }}</a></p>{% endif %}
          <p>Insta: <a href="https://www.instagram.com/{{ barber.insta }}/" rel="noopener" target="_blank">@{{ barber.insta }}</a></p>
          <p>Appointments: <a href="{{ barber.square }}" rel="noopener" target="_blank">Book Here</a></p>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
