(function () {
  'use strict';

  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  /**
   * ToggleBodyClass
   * ======================================
   * - toggle class on body
   * - multiple classes supported - "CLASSNAME CLASSNAME2 ..."
   * - add class to html attr [data-toggle="CLASSNAME"]
   * - remove class when attr [data-remove="CLASSNAME"]
   */

  var ELEMENTS = '.js-ToggleBodyClass';
  var ToggleBodyClass = /*#__PURE__*/_createClass(function ToggleBodyClass() {
    var _this = this;
    _classCallCheck(this, ToggleBodyClass);
    _defineProperty(this, "toggle", function (e) {
      var el = e.currentTarget;
      var classes = el.getAttribute('data-toggle');
      var classesRemove = el.getAttribute('data-remove');
      if (classesRemove) {
        classesRemove.split(" ").forEach(function (className) {
          document.body.classList.remove(className);
        });
      } else {
        classes.split(" ").forEach(function (className) {
          document.body.classList.toggle(className);
        });
      }
    });
    this.elements = document.querySelectorAll(ELEMENTS);
    if (!this.elements) {
      return false;
    }
    this.elements.forEach(function (el) {
      el.addEventListener('click', _this.toggle, false);
    });
  });
  new ToggleBodyClass();

  /*
    @ Add body class if:
    - scroll started
    - scrolled to bottom
  */

  var START_OFFSET = 500;
  var START_CLASS = "is-scrolled";
  var BOTTOM_OFFSET = 10;
  var BOTTOM_CLASS = "is-scrolled-bottom";
  var ScrollClass = /*#__PURE__*/_createClass(function ScrollClass() {
    var _this = this;
    _classCallCheck(this, ScrollClass);
    _defineProperty(this, "scrollHandler", function () {
      var top = document.documentElement.scrollTop;
      document.body.classList.toggle(START_CLASS, top >= START_OFFSET);
      document.body.classList.toggle(BOTTOM_CLASS, window.innerHeight + top >= document.body.offsetHeight - BOTTOM_OFFSET);
      _this.oldScroll = top;
    });
    document.addEventListener("scroll", this.scrollHandler, {
      passive: true
    });
    this.scrollHandler();
  });
  new ScrollClass();

  document.addEventListener("DOMContentLoaded", function () {
    var categories = document.querySelectorAll(".js-categories");
    categories.forEach(function (category) {
      category.addEventListener("click", function () {
        var parentLi = category.closest("li");
        if (parentLi) {
          parentLi.classList.toggle("is-open");
        }
      });
    });
  });

  function createElementWithClass(elementType, className) {
    var element = document.createElement(elementType);
    element.className = className;
    return element;
  }
  function closeAllSelect(excludeElement) {
    document.querySelectorAll(".select-items").forEach(function (item) {
      if (item.parentNode !== excludeElement) {
        item.classList.add("select-hide");
      }
    });
    document.querySelectorAll(".select-selected").forEach(function (selected) {
      if (selected !== excludeElement) {
        selected.classList.remove("select-arrow-active");
      }
    });
    document.querySelectorAll(".select").forEach(function (select) {
      if (select !== excludeElement) {
        select.classList.remove("is-open");
      }
    });
  }
  document.querySelectorAll(".select").forEach(function (customSelect) {
    var selectElement = customSelect.querySelector("select");
    var selectedElement = createElementWithClass("DIV", "select-selected");
    selectedElement.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    customSelect.appendChild(selectedElement);
    var optionListElement = createElementWithClass("DIV", "select-items select-hide");
    for (var i = 1; i < selectElement.length; i++) {
      var option = selectElement.options[i];
      var optionElement = createElementWithClass("DIV", "");
      optionElement.innerHTML = option.innerHTML;
      optionElement.addEventListener("click", function () {
        var value = this.innerHTML;
        selectedElement.innerHTML = value;
        selectElement.value = value;
        closeAllSelect(customSelect);
      });
      optionListElement.appendChild(optionElement);
    }
    customSelect.appendChild(optionListElement);
    selectedElement.addEventListener("click", function (event) {
      event.stopPropagation();
      closeAllSelect(customSelect);
      optionListElement.classList.toggle("select-hide");
      selectedElement.classList.toggle("select-arrow-active");
      customSelect.classList.toggle("is-open");
    });
  });
  document.addEventListener("click", function () {
    closeAllSelect(null);
  });

  document.addEventListener('DOMContentLoaded', function () {
    var switchInputs = document.querySelectorAll('.switch input[type="checkbox"]');
    switchInputs.forEach(function (switchInput) {
      var switchElement = switchInput.parentElement;
      if (switchInput.checked) {
        switchElement.classList.add('is-checked');
      }
      switchInput.addEventListener('change', function () {
        if (this.checked) {
          switchElement.classList.add('is-checked');
        } else {
          switchElement.classList.remove('is-checked');
        }
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var headers = document.querySelectorAll('.filter__header');
    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var item = this.closest('.filter__item');
        item.classList.toggle('is-open');
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    var totopButtons = document.querySelectorAll('.totop');
    totopButtons.forEach(function (totop) {
      totop.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var openers = document.querySelectorAll('.js-opener');
    openers.forEach(function (opener) {
      opener.addEventListener('click', function () {
        var parent = this.parentElement;
        parent.classList.toggle('is-visible');
      });
    });
  });

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9Ub2dnbGVCb2R5Q2xhc3MuanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL1Njcm9sbENsYXNzLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9DYXRlZ29yaWVzLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9TZWxlY3QuanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL1N3aXRjaC5qcyIsInNyYy9zY3JpcHRzL21vZHVsZXMvRmlsdGVyLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9Ub1RvcC5qcyIsInNyYy9zY3JpcHRzL21vZHVsZXMvT3BlbmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUb2dnbGVCb2R5Q2xhc3NcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogLSB0b2dnbGUgY2xhc3Mgb24gYm9keVxyXG4gKiAtIG11bHRpcGxlIGNsYXNzZXMgc3VwcG9ydGVkIC0gXCJDTEFTU05BTUUgQ0xBU1NOQU1FMiAuLi5cIlxyXG4gKiAtIGFkZCBjbGFzcyB0byBodG1sIGF0dHIgW2RhdGEtdG9nZ2xlPVwiQ0xBU1NOQU1FXCJdXHJcbiAqIC0gcmVtb3ZlIGNsYXNzIHdoZW4gYXR0ciBbZGF0YS1yZW1vdmU9XCJDTEFTU05BTUVcIl1cclxuICovXHJcblxyXG4gY29uc3QgRUxFTUVOVFMgPSAnLmpzLVRvZ2dsZUJvZHlDbGFzcydcclxuXHJcbiBjbGFzcyBUb2dnbGVCb2R5Q2xhc3Mge1xyXG4gICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICB0aGlzLmVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChFTEVNRU5UUylcclxuXHJcbiAgICAgaWYgKCF0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICB9XHJcblxyXG4gICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlLCBmYWxzZSlcclxuICAgICB9KVxyXG4gICB9XHJcblxyXG4gICB0b2dnbGUgPSAoZSkgPT4ge1xyXG4gICAgIGNvbnN0IGVsID0gZS5jdXJyZW50VGFyZ2V0XHJcbiAgICAgY29uc3QgY2xhc3NlcyA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUnKVxyXG4gICAgIGNvbnN0IGNsYXNzZXNSZW1vdmUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVtb3ZlJylcclxuXHJcbiAgICAgaWYoY2xhc3Nlc1JlbW92ZSl7XHJcbiAgICAgIGNsYXNzZXNSZW1vdmUuc3BsaXQoXCIgXCIpLmZvckVhY2goY2xhc3NOYW1lID0+IHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxyXG4gICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgY2xhc3Nlcy5zcGxpdChcIiBcIikuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKVxyXG4gICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICB9XHJcbiB9XHJcblxyXG4gbmV3IFRvZ2dsZUJvZHlDbGFzcygpXHJcbiIsIi8qXHJcbiAgQCBBZGQgYm9keSBjbGFzcyBpZjpcclxuICAtIHNjcm9sbCBzdGFydGVkXHJcbiAgLSBzY3JvbGxlZCB0byBib3R0b21cclxuKi9cclxuXHJcbmNvbnN0IFNUQVJUX09GRlNFVCA9IDUwMDtcclxuY29uc3QgU1RBUlRfQ0xBU1MgPSBcImlzLXNjcm9sbGVkXCI7XHJcbmNvbnN0IEJPVFRPTV9PRkZTRVQgPSAxMDtcclxuY29uc3QgQk9UVE9NX0NMQVNTID0gXCJpcy1zY3JvbGxlZC1ib3R0b21cIjtcclxuXHJcbmNvbnN0IFVQX0RPV05fQ0xBU1NFUyA9IGZhbHNlO1xyXG5jb25zdCBVUF9DTEFTUyA9IFwic2Nyb2xsaW5nLXVwXCI7XHJcbmNvbnN0IERPV05fQ0xBU1MgPSBcInNjcm9sbGluZy1kb3duXCI7XHJcblxyXG5jbGFzcyBTY3JvbGxDbGFzcyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuc2Nyb2xsSGFuZGxlciwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIHNjcm9sbEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShTVEFSVF9DTEFTUywgdG9wID49IFNUQVJUX09GRlNFVCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXHJcbiAgICAgIEJPVFRPTV9DTEFTUyxcclxuICAgICAgd2luZG93LmlubmVySGVpZ2h0ICsgdG9wID49IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gQk9UVE9NX09GRlNFVFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoVVBfRE9XTl9DTEFTU0VTKSB7XHJcbiAgICAgIGlmKHRoaXMub2xkU2Nyb2xsID4gdG9wKXtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoVVBfQ0xBU1MpXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKERPV05fQ0xBU1MpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChET1dOX0NMQVNTKVxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShVUF9DTEFTUyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sZFNjcm9sbCA9IHRvcDtcclxuXHJcbiAgfTtcclxufVxyXG5cclxubmV3IFNjcm9sbENsYXNzKCk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNhdGVnb3JpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWNhdGVnb3JpZXNcIik7XHJcbiAgICBjYXRlZ29yaWVzLmZvckVhY2goZnVuY3Rpb24oY2F0ZWdvcnkpIHtcclxuICAgICAgICBjYXRlZ29yeS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRMaSA9IGNhdGVnb3J5LmNsb3Nlc3QoXCJsaVwiKTtcclxuICAgICAgICAgICAgaWYgKHBhcmVudExpKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRMaS5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtb3BlblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJmdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aENsYXNzKGVsZW1lbnRUeXBlLCBjbGFzc05hbWUpIHtcclxuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZUFsbFNlbGVjdChleGNsdWRlRWxlbWVudCkge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0LWl0ZW1zXCIpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgaWYgKGl0ZW0ucGFyZW50Tm9kZSAhPT0gZXhjbHVkZUVsZW1lbnQpIHtcclxuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0LWhpZGVcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Qtc2VsZWN0ZWRcIikuZm9yRWFjaChmdW5jdGlvbihzZWxlY3RlZCkge1xyXG4gICAgaWYgKHNlbGVjdGVkICE9PSBleGNsdWRlRWxlbWVudCkge1xyXG4gICAgICBzZWxlY3RlZC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0LWFycm93LWFjdGl2ZVwiKTtcclxuICAgIH1cclxuICB9KTtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHNlbGVjdCkge1xyXG4gICAgaWYgKHNlbGVjdCAhPT0gZXhjbHVkZUVsZW1lbnQpIHtcclxuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1vcGVuXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGN1c3RvbVNlbGVjdCkge1xyXG4gIHZhciBzZWxlY3RFbGVtZW50ID0gY3VzdG9tU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoXCJzZWxlY3RcIik7XHJcblxyXG4gIHZhciBzZWxlY3RlZEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFwiRElWXCIsIFwic2VsZWN0LXNlbGVjdGVkXCIpO1xyXG4gIHNlbGVjdGVkRWxlbWVudC5pbm5lckhUTUwgPSBzZWxlY3RFbGVtZW50Lm9wdGlvbnNbc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4XS5pbm5lckhUTUw7XHJcbiAgY3VzdG9tU2VsZWN0LmFwcGVuZENoaWxkKHNlbGVjdGVkRWxlbWVudCk7XHJcblxyXG4gIHZhciBvcHRpb25MaXN0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXCJESVZcIiwgXCJzZWxlY3QtaXRlbXMgc2VsZWN0LWhpZGVcIik7XHJcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWxlY3RFbGVtZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgb3B0aW9uID0gc2VsZWN0RWxlbWVudC5vcHRpb25zW2ldO1xyXG4gICAgdmFyIG9wdGlvbkVsZW1lbnQgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFwiRElWXCIsIFwiXCIpO1xyXG4gICAgb3B0aW9uRWxlbWVudC5pbm5lckhUTUwgPSBvcHRpb24uaW5uZXJIVE1MO1xyXG4gICAgb3B0aW9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuaW5uZXJIVE1MO1xyXG4gICAgICBzZWxlY3RlZEVsZW1lbnQuaW5uZXJIVE1MID0gdmFsdWU7XHJcbiAgICAgIHNlbGVjdEVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgY2xvc2VBbGxTZWxlY3QoY3VzdG9tU2VsZWN0KTtcclxuICAgIH0pO1xyXG4gICAgb3B0aW9uTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uRWxlbWVudCk7XHJcbiAgfVxyXG4gIGN1c3RvbVNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb25MaXN0RWxlbWVudCk7XHJcblxyXG4gIHNlbGVjdGVkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgY2xvc2VBbGxTZWxlY3QoY3VzdG9tU2VsZWN0KTtcclxuICAgIG9wdGlvbkxpc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3QtaGlkZVwiKTtcclxuICAgIHNlbGVjdGVkRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwic2VsZWN0LWFycm93LWFjdGl2ZVwiKTtcclxuICAgIGN1c3RvbVNlbGVjdC5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtb3BlblwiKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgY2xvc2VBbGxTZWxlY3QobnVsbCk7XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzd2l0Y2hJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3dpdGNoIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG5cclxuICAgIHN3aXRjaElucHV0cy5mb3JFYWNoKGZ1bmN0aW9uKHN3aXRjaElucHV0KSB7XHJcbiAgICAgICAgY29uc3Qgc3dpdGNoRWxlbWVudCA9IHN3aXRjaElucHV0LnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGlmIChzd2l0Y2hJbnB1dC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgaGVhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXJfX2hlYWRlcicpO1xyXG5cclxuICAgIGhlYWRlcnMuZm9yRWFjaChoZWFkZXIgPT4ge1xyXG4gICAgICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5jbG9zZXN0KCcuZmlsdGVyX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0b3RvcEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG90b3AnKTtcclxuXHJcbiAgICB0b3RvcEJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbih0b3RvcCkge1xyXG4gICAgICAgIHRvdG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBvcGVuZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW9wZW5lcicpO1xyXG5cclxuICAgIG9wZW5lcnMuZm9yRWFjaChmdW5jdGlvbihvcGVuZXIpIHtcclxuICAgICAgICBvcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbIkVMRU1FTlRTIiwiVG9nZ2xlQm9keUNsYXNzIiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJlIiwiZWwiLCJjdXJyZW50VGFyZ2V0IiwiY2xhc3NlcyIsImdldEF0dHJpYnV0ZSIsImNsYXNzZXNSZW1vdmUiLCJzcGxpdCIsImZvckVhY2giLCJjbGFzc05hbWUiLCJkb2N1bWVudCIsImJvZHkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ0b2dnbGUiLCJlbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiU1RBUlRfT0ZGU0VUIiwiU1RBUlRfQ0xBU1MiLCJCT1RUT01fT0ZGU0VUIiwiQk9UVE9NX0NMQVNTIiwiU2Nyb2xsQ2xhc3MiLCJ0b3AiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsIm9mZnNldEhlaWdodCIsIm9sZFNjcm9sbCIsInNjcm9sbEhhbmRsZXIiLCJwYXNzaXZlIiwiY2F0ZWdvcmllcyIsImNhdGVnb3J5IiwicGFyZW50TGkiLCJjbG9zZXN0IiwiY3JlYXRlRWxlbWVudFdpdGhDbGFzcyIsImVsZW1lbnRUeXBlIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbG9zZUFsbFNlbGVjdCIsImV4Y2x1ZGVFbGVtZW50IiwiaXRlbSIsInBhcmVudE5vZGUiLCJhZGQiLCJzZWxlY3RlZCIsInNlbGVjdCIsImN1c3RvbVNlbGVjdCIsInNlbGVjdEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0ZWRFbGVtZW50IiwiaW5uZXJIVE1MIiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJhcHBlbmRDaGlsZCIsIm9wdGlvbkxpc3RFbGVtZW50IiwiaSIsImxlbmd0aCIsIm9wdGlvbiIsIm9wdGlvbkVsZW1lbnQiLCJ2YWx1ZSIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwic3dpdGNoSW5wdXRzIiwic3dpdGNoSW5wdXQiLCJzd2l0Y2hFbGVtZW50IiwicGFyZW50RWxlbWVudCIsImNoZWNrZWQiLCJoZWFkZXJzIiwiaGVhZGVyIiwidG90b3BCdXR0b25zIiwidG90b3AiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwib3BlbmVycyIsIm9wZW5lciIsInBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQyxJQUFNQSxRQUFRLEdBQUcscUJBQXFCO0VBQUEsSUFFaENDLGVBQWUsZ0JBQUFDLFlBQUEsQ0FDbkIsU0FBQUQsa0JBQWM7SUFBQSxJQUFBRSxLQUFBO0lBQUFDLGVBQUEsT0FBQUgsZUFBQTtJQUFBSSxlQUFBLGlCQVlMLFVBQUNDLENBQUMsRUFBSztNQUNkLElBQU1DLEVBQUUsR0FBR0QsQ0FBQyxDQUFDRSxhQUFhO01BQzFCLElBQU1DLE9BQU8sR0FBR0YsRUFBRSxDQUFDRyxZQUFZLENBQUMsYUFBYSxDQUFDO01BQzlDLElBQU1DLGFBQWEsR0FBR0osRUFBRSxDQUFDRyxZQUFZLENBQUMsYUFBYSxDQUFDO01BRXBELElBQUdDLGFBQWEsRUFBQztRQUNoQkEsYUFBYSxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFBQyxTQUFTLEVBQUk7VUFDNUNDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLENBQUNDLE1BQU0sQ0FBQ0osU0FBUyxDQUFDO1NBQ3pDLENBQUM7T0FDSixNQUFNO1FBQ05MLE9BQU8sQ0FBQ0csS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBQUMsU0FBUyxFQUFJO1VBQ3ZDQyxRQUFRLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxDQUFDRSxNQUFNLENBQUNMLFNBQVMsQ0FBQztTQUN6QyxDQUFDOztL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
