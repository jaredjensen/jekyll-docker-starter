module Jekyll
  module GpsFilter
    def gps(input, type)
      @coord = input.to_f
      @degrees = input.to_i
      @minutes = ((@coord - @degrees).abs * 60 * 100).floor / 100.0

      @degreeSymbol = "°"
      @compassSymbol = "-"

      if type == "lat"
        if @coord < 0
          @compassSymbol = "S"
        else
          @compassSymbol = "N"
        end
      else
        if @coord < 0
          @compassSymbol = "W"
        else
          @compassSymbol = "E"
        end
      end

      "#{@degrees.abs}#{@degreeSymbol} #{@minutes}' #{@compassSymbol}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::GpsFilter)