---
title: Barbers
barbers:
  - name: "Colin Davey"
    image: "/img/colin.jpg"
    phone: "(407) 459-3589"
    insta: "bostoncolin"
    square: "https://square.site/book/5CGVSJ9WRXGYM/townies-barbershop-orlando-fl"
  - name: "Alex Kuechenmeister"
    image: "/img/alex.jpg"
    phone: "(407) 399-3598"
    insta: "alexkthebarber"
    square: "https://square.site/book/BE2BBS4A7C5DP/alex-the-barber"
  - name: "Mick Tyrrell"
    image: "/img/mick.jpg"
    phone: "(239) 810-8092"
    insta: "micktyrrellbarber"
    square: "https://square.site/book/4P9FSRX17P39R/mick-t-barber-orlando-fl"
  - name: "Christopher X. Alvarado"
    image: "/img/chris.jpg"
    phone: "(407) 459-0113"
    insta: "belikebuddha2"
    square: "https://square.site/book/LFFAZ2TXYM6FR/christopher-x-alvarado-orlando-fl"
---

<div class="grid-container">
  <div class="grid-x grid-margin-x barbers">
    {% for barber in page.barbers %}
    <div class="cell medium-6 large-3">
      <div class="card">
        <img class="avatar" alt="{{ barber.name }}" src="{{ barber.image }}">
        <div class="info">
          <h2>{{ barber.name }}</h2>
          <p>Phone: <a href="tel:{{ barber.phone | remove: "(" | remove: ")" | remove: " " | remove: "-" }}">{{ barber.phone }}</a></p>
          <p>Insta: <a href="https://www.instagram.com/{{ barber.insta }}/" rel="noopener" target="_blank">@{{ barber.insta }}</a></p>
          <p>Appointments: <a href="{{ barber.square }}" rel="noopener" target="_blank">Book Here</a></p>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
