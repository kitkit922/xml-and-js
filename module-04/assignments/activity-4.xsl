<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">   
  <xsl:template match="/">
    <html>
      <body>
      <h1>Table 1</h1>
        <table border="1">
          <tr>
            <th>productName</th>
            <th>manufacturer id</th>
            <th>description</th>
            <th>USD price</th>
          </tr>
          <xsl:for-each select = "products/product">
            <xsl:if test="@shippable='true'">
                <tr>
                    <td><xsl:value-of select="productName" /></td>
                    <td><xsl:value-of select="manufacturer/@id" /></td>
                    <td><xsl:value-of select="description" /></td>
                    <td><xsl:value-of select="prices/price[1]" /></td>
                </tr>
            </xsl:if>
          </xsl:for-each>
        </table>

        <h1>Table 2</h1>
        <table border="1">
          <tr>
            <th>productName</th>
            <th>description</th>
            <th>USD price</th>
            <th>EURO price</th>
          </tr>
          <xsl:for-each select = "products/product">
            <xsl:if test="manufacturer/@id='acme'">
                <tr>
                    <td><xsl:value-of select="productName" /></td>
                    <td><xsl:value-of select="description" /></td>
                    <td><xsl:value-of select="prices/price[1]" /></td>
                    <td><xsl:value-of select="(prices/price)[last()]" /></td>
                </tr>
            </xsl:if>
          </xsl:for-each>
        </table>

      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>